import Editor, { type Monaco } from "@monaco-editor/react";

import { builtinSchemas } from "../../services/schemas";

import type { OpenedFile } from "../../types/editor";
import type { ConstructraSettings } from "../../services/settings/types";

interface WorkspaceProps {
  openedFile: OpenedFile | null;
  settings: ConstructraSettings | null;
}

function getLanguage(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
    case "tsx":
      return "typescript";

    case "js":
    case "jsx":
      return "javascript";

    case "rs":
      return "rust";

    case "py":
      return "python";

    case "cs":
      return "csharp";

    case "c":
      return "c";

    case "cpp":
    case "cc":
    case "cxx":
    case "hpp":
    case "h":
      return "cpp";

    case "java":
      return "java";

    case "go":
      return "go";

    case "json":
      return "json";

    case "html":
      return "html";

    case "css":
      return "css";

    case "scss":
      return "scss";

    case "md":
      return "markdown";

    case "yaml":
    case "yml":
      return "yaml";

    case "svg":
    case "xml":
      return "xml";

    case "sql":
      return "sql";

    case "sh":
    case "bash":
      return "shell";

    default:
      return "plaintext";
  }
}

function configureMonaco(monaco: Monaco) {
  monaco.languages.json.jsonDefaults.setDiagnosticOptions({
    valudate: true,
    allowComments: true,

    schemas: builtinSchemas.map((registration) => ({
      uri: registration.uri,
      fileMatch: registration.fileMatch,
      schema: registration.schema,
    })),
  });
}

function Workspace({ openedFile, settings }: WorkspaceProps) {
  const editorSettings = settings?.editor;

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

      <div className="monaco-container">
        <Editor
          path={openedFile.path}
          language={getLanguage(openedFile.name)}
          value={openedFile.content}
          theme="vs-dark"
          beforeMount={configureMonaco}
          options={{
            automaticLayout: true,
            fontSize: editorSettings?.fontSize ?? 13,
            minimap: {
              enabled: editorSettings?.minimap.enabled ?? true,
            },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            tabSize: editorSettings?.tabSize ?? 2,
            wordWrap: editorSettings?.wordWrap ?? "off",
          }}
        />
      </div>
    </main>
  );
}

export default Workspace;
