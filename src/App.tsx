import "./App.css";

import ActivityBar from "./components/layout/ActivityBar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import BottomPanel from "./components/layout/BottomPanel";
import StatusBar from "./components/layout/StatusBar";

function App() {
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
            <Sidebar />
            <Workspace />
          </div>

          <BottomPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
}

export default App;
