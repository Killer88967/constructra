use std::{ fs, path::{ Path, PathBuf } };

use serde_json::{ json, Value };
use tauri::Manager;

const SETTINGS_FILE_NAME: &str = "settings.json";
const WORKSPACE_DIRECTORY: &str = ".constructra";
const WORKSPACE_SETTINGS_FILE: &str = "settings.json";
const WORKSPACE_LOCAL_SETTINGS_FILE: &str = "settings.local.json";

fn default_settings() -> Value {
    json!({
        "editor": {
            "fontSize": 13,
            "tabSize": 2,
            "wordWrap": "off",
            "minimap": {
                "enabled": true
            }
        },

        "workbench": {
            "sidebar": {
                "width": 250
            },

            "panel": {
                "height": 190
            }
        },

        "files": {
            "autoSave": "off"
        }
    })
}

fn user_settings_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let config_directory = app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Failed to resolve config directory: {error}"))?;

    Ok(config_directory.join(SETTINGS_FILE_NAME))
}

fn workspace_settings_path(workspace_path: &str) -> PathBuf {
    Path::new(workspace_path).join(WORKSPACE_DIRECTORY).join(WORKSPACE_SETTINGS_FILE)
}

fn workspace_local_settings_path(workspace_path: &str) -> PathBuf {
    Path::new(workspace_path).join(WORKSPACE_DIRECTORY).join(WORKSPACE_LOCAL_SETTINGS_FILE)
}

fn read_settings_file(path: &Path) -> Result<Value, String> {
    if !path.exists() {
        return Ok(json!({}));
    }

    let content = fs
        ::read_to_string(path)
        .map_err(|error| { format!("Failed to read settings file {}: {error}", path.display()) })?;

    serde_json
        ::from_str(&content)
        .map_err(|error| { format!("Failed to parse settings file {}: {error}", path.display()) })
}

fn merge_values(base: &mut Value, override_value: Value) {
    match (base, override_value) {
        (Value::Object(base_object), Value::Object(override_object)) => {
            for (key, value) in override_object {
                match base_object.get_mut(&key) {
                    Some(existing_value) => {
                        merge_values(existing_value, value);
                    }

                    None => {
                        base_object.insert(key, value);
                    }
                }
            }
        }

        (base_value, override_value) => {
            *base_value = override_value;
        }
    }
}

fn ensure_user_settings_file(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let path = user_settings_path(app)?;

    if path.exists() {
        return Ok(path);
    }

    if let Some(parent) = path.parent() {
        fs
            ::create_dir_all(parent)
            .map_err(|error| {
                format!("Failed to create settings directory {}: {error}", parent.display())
            })?;
    }

    let initial_settings = json!({
        "$schema": "constructra://schemas/settings"
    });

    let content = serde_json
        ::to_string_pretty(&initial_settings)
        .map_err(|error| format!("Failed to serialize settings: {error}"))?;

    fs
        ::write(&path, content)
        .map_err(|error| {
            format!("Failed to create settings file {}: {error}", path.display())
        })?;

    Ok(path)
}

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SettingsResult {
    pub defaults: Value,
    pub user: Value,
    pub workspace: Value,
    pub local: Value,
    pub effective: Value,

    pub user_path: String,
    pub workspace_path: Option<String>,
    pub local_path: Option<String>,
}

#[tauri::command]
pub fn get_settings(
    app: tauri::AppHandle,
    workspace_path: Option<String>
) -> Result<SettingsResult, String> {
    let user_path = ensure_user_settings_file(&app)?;

    let defaults = default_settings();
    let user = read_settings_file(&user_path)?;

    let (workspace, local, workspace_file, local_file) = if
        let Some(workspace_path) = workspace_path
    {
        let workspace_file = workspace_settings_path(&workspace_path);
        let local_file = workspace_local_settings_path(&workspace_path);

        (
            read_settings_file(&workspace_file)?,
            read_settings_file(&local_file)?,
            Some(workspace_file),
            Some(local_file),
        )
    } else {
        (json!({}), json!({}), None, None)
    };

    let mut effective = defaults.clone();

    merge_values(&mut effective, user.clone());
    merge_values(&mut effective, workspace.clone());
    merge_values(&mut effective, local.clone());

    Ok(SettingsResult {
        defaults,
        user,
        workspace,
        local,
        effective,

        user_path: user_path.to_string_lossy().to_string(),

        workspace_path: workspace_file.map(|path| path.to_string_lossy().to_string()),

        local_path: local_file.map(|path| path.to_string_lossy().to_string()),
    })
}
