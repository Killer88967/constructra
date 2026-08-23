import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

import type { FileEntry } from "../../types/filesystem";

interface FileTreeNodeProps {
  entry: FileEntry;
  depth?: number;
  onOpenFile: (entry: FileEntry) => void;
}

function FileTreeNode({ entry, depth = 0, onOpenFile }: FileTreeNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<FileEntry[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!entry.isDirectory) {
      onOpenFile(entry);
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
        onClick={handleClick}
      >
        <span className="file-tree-icon">
          {entry.isDirectory ? (loading ? "…" : expanded ? "⌄" : "›") : ""}
        </span>

        <span>{entry.name}</span>
      </div>

      {expanded &&
        children?.map((child) => (
          <FileTreeNode
            key={child.path}
            entry={child}
            depth={depth + 1}
            onOpenFile={onOpenFile}
          />
        ))}
    </>
  );
}

export default FileTreeNode;
