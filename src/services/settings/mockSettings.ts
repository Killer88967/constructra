import type {
  ConstructraSettings,
  DeepPartial,
  SettingsProvider,
  SettingsResult,
} from "./types";

const defaults: ConstructraSettings = {
  editor: {
    fontSize: 13,
    tabSize: 2,
    wordWrap: "off",
    minimap: {
      enabled: true,
    },
  },
  workbench: {
    sidebar: {
      width: 250,
    },
    panel: {
      height: 190,
    },
  },
  files: {
    autoSave: "off",
  },
};

const user: DeepPartial<ConstructraSettings> = {
  editor: {
    fontSize: 14,
  },
};

const workspace: DeepPartial<ConstructraSettings> = {
  editor: {
    tabSize: 4,
  },
};

const local: DeepPartial<ConstructraSettings> = {
  workbench: {
    panel: {
      height: 220,
    },
  },
};

const effective: ConstructraSettings = {
  editor: {
    fontSize: 14,
    tabSize: 4,
    wordWrap: "off",
    minimap: {
      enabled: true,
    },
  },

  workbench: {
    sidebar: {
      width: 250,
    },

    panel: {
      height: 220,
    },
  },

  files: {
    autoSave: "off",
  },
};

const userEffective: ConstructraSettings = {
  ...defaults,

  editor: {
    ...defaults.editor,
    ...user.editor,

    minimap: {
      ...defaults.editor.minimap,
      ...user.editor?.minimap,
    },
  },
};

export const mockSettings: SettingsProvider = {
  async getSettings(workspacePath) {
    const result: SettingsResult = {
      defaults,
      user,
      workspace: workspacePath ? workspace : {},
      local: workspacePath ? local : {},
      effective: workspacePath ? effective : userEffective,

      userPath: "/mock/user/settings.json",

      workspacePath: workspacePath
        ? `${workspacePath}/.constructra/settings.json`
        : null,

      localPath: workspacePath
        ? `${workspacePath}/.constructra/settings.local.json`
        : null,
    };

    return result;
  },
};
