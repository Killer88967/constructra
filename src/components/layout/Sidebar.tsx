import type { FileEntry } from "../../types/filesystem";
import FileTree from "../explorer/FileTree";

interface SidebarProps {
  projectPath: string | null;
  projectFiles: FileEntry[];
  onOpenFolder: () => void;
  onOpenFile: (entry: FileEntry) => void;
}

function Sidebar({
  projectPath,
  projectFiles,
  onOpenFolder,
  onOpenFile,
}: SidebarProps) {
  const pathParts = projectPath
    ? projectPath.split(/[\\/]/).filter(Boolean)
    : [];

  const projectName =
    pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Explorer</div>

      <div className="sidebar-content">
        {projectPath ? (
          <div className="project-root">
            <div className="project-root-name">
              <span>⌄</span>
              <strong>{projectName}</strong>
            </div>

            <FileTree entries={projectFiles} onOpenFile={onOpenFile} />
          </div>
        ) : (
          <div className="empty-explorer">
            <p>No folder opened</p>

            <button className="primary-button" onClick={onOpenFolder}>
              Open Folder
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
