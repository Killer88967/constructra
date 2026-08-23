import type { FileEntry } from "../../types/filesystem";

export interface FilesystemProvider {
  openDirectory(): Promise<string | null>;

  readDirectory(path: string): Promise<FileEntry[]>;

  readFile(path: string): Promise<string>;
}
