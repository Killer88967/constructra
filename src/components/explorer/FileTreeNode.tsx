import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

import type { FileEntry } from "../../types/filesystem";

interface FileTreeNodeProps {
  entry: FileEntry;
  depth?: number;
}

function FileTreeNode({ entry, depth = 0 }: FileTreeNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<FileEntry[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggleDirectory() {
    if (!entry.isDirectory) {
      return;
    }

    if (!expanded && children === null) {
      setLoading(true);

      try {
        const result = await invoke<FileEntry[]>("read_directory", {
          path: entry.path,
        });

        setChildren(result);
      } finally {
        setLoading(false);
      }
    }

    setExpanded((current) => !current);
  }

  return (
    <>
      <div
        className="file-tree-entry"
        style={{ paddingLeft: `${depth * 14}px` }}
        onClick={toggleDirectory}
      >
        <span className="file-tree-icon">
          {entry.isDirectory ? (loading ? "…" : expanded ? "⌄" : "›") : ""}
        </span>

        <span>{entry.name}</span>
      </div>

      {expanded &&
        children?.map((child) => (
          <FileTreeNode key={child.path} entry={child} depth={depth + 1} />
        ))}
    </>
  );
}

export default FileTreeNode;
