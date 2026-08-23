import {
  MOCK_PROJECT_PATH,
  mockDirectories,
  mockFiles,
} from "../../dev/mockProject";

import type { FilesystemProvider } from "./types";

export const mockFilesystem: FilesystemProvider = {
  async openDirectory() {
    return MOCK_PROJECT_PATH;
  },

  async readDirectory(path) {
    const entries = mockDirectories[path];

    if (!entries) {
      throw new Error(`Mock directory does not exist: ${path}`);
    }

    return entries;
  },

  async readFile(path) {
    const content = mockFiles[path];

    if (content === undefined) {
      throw new Error(`Mock file does not exist: ${path}`);
    }

    return content;
  },
};
