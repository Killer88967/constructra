import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

import "./App.css";

import ActivityBar from "./components/layout/ActivityBar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import BottomPanel from "./components/layout/BottomPanel";
import StatusBar from "./components/layout/StatusBar";

import type { FileEntry } from "./types/filesystem";
import type { OpenedFile } from "./types/editor";

function App() {
  const [projectPath, setProjectPath] = useState<string | null>(null);
  const [projectFiles, setProjectFiles] = useState<FileEntry[]>([]);
  const [openedFile, setOpenedFile] = useState<OpenedFile | null>(null);

  async function openFolder() {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (typeof selected !== "string") {
      return;
    }

    const files = await invoke<FileEntry[]>("read_directory", {
      path: selected,
    });

    setProjectPath(selected);
    setProjectFiles(files);
  }

  async function openFile(entry: FileEntry) {
    const content = await invoke<string>("read_file", {
      path: entry.path,
    });

    setOpenedFile({
      name: entry.name,
      path: entry.path,
      content,
    });
  }

  return (
    <div className="app">
      <header className="titlebar">
        <div className="titlebar-brand">Constructra</div>

        <nav className="titlebar-menu">
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
          <button>Run</button>
          <button>Terminal</button>
          <button>Help</button>
        </nav>
      </header>

      <div className="app-body">
        <ActivityBar />

        <div className="main-area">
          <div className="workspace-row">
            <Sidebar
              projectPath={projectPath}
              projectFiles={projectFiles}
              onOpenFolder={openFolder}
              onOpenFile={openFile}
            />

            <Workspace openedFile={openedFile} />
          </div>

          <BottomPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
}

export default App;
