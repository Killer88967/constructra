import type { FileEntry } from "../../types/filesystem";
import FileTreeNode from "./FileTreeNode";

interface FileTreeProps {
  entries: FileEntry[];
}

function FileTree({ entries }: FileTreeProps) {
  return (
    <div className="file-tree">
      {entries.map((entry) => (
        <FileTreeNode key={entry.path} entry={entry} />
      ))}
    </div>
  );
}

export default FileTree;
