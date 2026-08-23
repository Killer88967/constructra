interface SidebarProps {
  projectPath: string | null;
  onOpenFolder: () => void;
}

function Sidebar({ projectPath, onOpenFolder }: SidebarProps) {
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

            <div className="project-path">{projectPath}</div>
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
