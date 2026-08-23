import { invoke } from "@tauri-apps/api/core";

import type { SettingsProvider, SettingsResult } from "./types";

export const tauriSettings: SettingsProvider = {
  async getSettings(workspacePath) {
    return invoke<SettingsResult>("get_settings", {
      workspacePath: workspacePath ?? null,
    });
  },
};
