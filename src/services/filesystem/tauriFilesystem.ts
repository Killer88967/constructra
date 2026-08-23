import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

import type { FileEntry } from "../../types/filesystem";
import type { FilesystemProvider } from "./types";

export const tauriFilesystem: FilesystemProvider = {
  async openDirectory() {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    return typeof selected === "string" ? selected : null;
  },

  async readDirectory(path) {
    return invoke<FileEntry[]>("read_directory", {
      path,
    });
  },

  async readFile(path) {
    return invoke<string>("read_file", {
      path,
    });
  },
};
