import type { FileEntry } from "../../types/filesystem";
import FileTreeNode from "./FileTreeNode";

interface FileTreeProps {
  entries: FileEntry[];
  onOpenFile: (entry: FileEntry) => void;
}

function FileTree({ entries, onOpenFile }: FileTreeProps) {
  return (
    <div className="file-tree">
      {entries.map((entry) => (
        <FileTreeNode key={entry.path} entry={entry} onOpenFile={onOpenFile} />
      ))}
    </div>
  );
}

export default FileTree;
