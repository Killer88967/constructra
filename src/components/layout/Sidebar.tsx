function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Explorer</div>

      <div className="sidebar-content">
        <div className="empty-explorer">
          <p>No folder opened</p>
          <button className="primary-button">Open Folder</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
