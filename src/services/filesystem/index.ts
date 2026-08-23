import { mockFilesystem } from "./mockFilesystem";
import { tauriFilesystem } from "./tauriFilesystem";

const isTauri = "__TAURI_INTERNALS__" in window;

export const filesystem = isTauri ? tauriFilesystem : mockFilesystem;

export const filesystemEnvironment = isTauri ? "tauri" : "mock";
