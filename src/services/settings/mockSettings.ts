import type {
  SettingsProvider,
  SettingsResult,
} from "./types";

const defaults = {
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

const user = {
  editor: {
    fontSize: 14,
  },
};

const workspace = {
  editor: {
    tabSize: 4,
  },
};

const local = {
  workbench: {
    panel: {
      height: 220,
    },
  },
};

const effective = {
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

export const mockSettings: SettingsProvider = {
  async getSettings(workspacePath) {
    const result: SettingsResult = {
      defaults,
      user,
      workspace: workspacePath ? workspace : {},
      local: workspacePath ? local : {},
      effective: workspacePath
        ? effective
        : {
            ...defaults,
            editor: {
              ...defaults.editor,
              ...user.editor,
            },
          },

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