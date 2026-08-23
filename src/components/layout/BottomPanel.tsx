function BottomPanel() {
  return (
    <section className="bottom-panel">
      <div className="bottom-panel-tabs">
        <button>Problems</button>
        <button>Output</button>
        <button className="active">Terminal</button>
      </div>

      <div className="bottom-panel-content">
        <span>No terminal session.</span>
      </div>
    </section>
  );
}

export default BottomPanel;
