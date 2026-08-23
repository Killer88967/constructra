import type { OpenedFile } from "../../types/editor";

interface WorkspaceProps {
  openedFile: OpenedFile | null;
}

function Workspace({ openedFile }: WorkspaceProps) {
  if (!openedFile) {
    return (
      <main className="workspace">
        <div className="workspace-empty">
          <h1>Constructra</h1>
          <p>A modular development environment for building anything.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="workspace workspace-file">
      <div className="editor-tab-bar">
        <div className="editor-tab active">{openedFile.name}</div>
      </div>

      <pre className="plain-editor">
        <code>{openedFile.content}</code>
      </pre>
    </main>
  );
}

export default Workspace;
