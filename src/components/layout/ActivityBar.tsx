function ActivityBar() {
  return (
    <aside className="activity-bar">
      <div className="activity-bar-main">
        <button className="activity-button active" title="Explorer">
          ◫
        </button>

        <button className="activity-button" title="Search">
          ⌕
        </button>

        <button className="activity-button" title="Source Control">
          ⑂
        </button>

        <button className="activity-button" title="Run and Debug">
          ▷
        </button>

        <button className="activity-button" title="Extensions">
          ◈
        </button>
      </div>

      <div className="activity-bar-bottom">
        <button className="activity-button" title="Settings">
          ⚙
        </button>
      </div>
    </aside>
  );
}

export default ActivityBar;
