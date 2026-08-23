export interface ConstructraSettings {
  editor: {
    fontSize: number;
    tabSize: number;
    wordWrap: "off" | "on" | "wordWrapColumn" | "bounded";

    minimap: {
      enabled: boolean;
    };
  };

  workbench: {
    sidebar: {
      width: number;
    };

    panel: {
      height: number;
    };
  };

  files: {
    autoSave: "off" | "afterDelay";
  };
}

export type PartialConstructraSettings = {
  [K in keyof ConstructraSettings]?: ConstructraSettings[K] extends object
    ? Partial<ConstructraSettings[K]>
    : ConstructraSettings[K];
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface SettingsResult {
  defaults: ConstructraSettings;
  user: DeepPartial<ConstructraSettings>;
  workspace: DeepPartial<ConstructraSettings>;
  local: DeepPartial<ConstructraSettings>;
  effective: ConstructraSettings;

  userPath: string;
  workspacePath: string | null;
  localPath: string | null;
}

export interface SettingsProvider {
  getSettings(workspacePath?: string | null): Promise<SettingsResult>;
}
