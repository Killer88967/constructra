import type { FileEntry } from "../../types/filesystem";

interface SidebarProps {
  projectPath: string | null;
  projectFiles: FileEntry[];
  onOpenFolder: () => void;
}

function Sidebar({ projectPath, projectFiles, onOpenFolder }: SidebarProps) {
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

            <div className="file-tree">
              {projectFiles.map((entry) => (
                <div className="file-tree-entry" key={entry.path}>
                  <span className="file-tree-icon">
                    {entry.isDirectory ? "▸" : ""}
                  </span>

                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
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
