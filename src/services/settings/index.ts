import { mockSettings } from "./mockSettings";
import { tauriSettings } from "./tauriSettings";

const isTauri = "__TAURI_INTERNALS__" in window;

export const settings = isTauri ? tauriSettings : mockSettings;
