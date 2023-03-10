import File from "../File/File";

import type { Props as FileProps } from "../File/File";

type Props = {
  files: FileProps[]
};

function FileList({ files }: Props) {
  return (
    <ul className="grid grid-cols-4 gap-4 py-4">
      {files.map((file) => <File key={file.name} name={file.name} />)}
    </ul>
  );
}

export default FileList;
