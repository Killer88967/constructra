interface StatusBarProps {
  environment: "tauri" | "mock";
}

function StatusBar({ environment }: StatusBarProps) {
  return (
    <footer className="status-bar">
      <div className="status-left">
        <span>Constructra</span>

        {environment === "mock" && <span className="status-dev">DEV MOCK</span>}
      </div>

      <div className="status-right">
        <span>Ready</span>
      </div>
    </footer>
  );
}

export default StatusBar;
