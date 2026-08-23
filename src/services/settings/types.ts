export interface SettingsResult {
  defaults: Record<string, unknown>;
  user: Record<string, unknown>;
  workspace: Record<string, unknown>;
  local: Record<string, unknown>;
  effective: Record<string, unknown>;

  userPath: string;
  workspacePath: string | null;
  localPath: string | null;
}

export interface SettingsProvider {
  getSettings(workspacePath?: string | null): Promise<SettingsResult>;
}
