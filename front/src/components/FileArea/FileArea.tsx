import { PropsWithChildren, useState } from "react";
import { useDropArea } from "react-use";

import styles from "./FileArea.module.css";

type Props = PropsWithChildren & {
  addNewFile(file: File): void;
};

function FileArea({ addNewFile, children }: Props) {
  const [showDropArea, setShowDropArea] = useState(false);

  const handleDropFiles = (files: File[]) => {
    console.log("🚀 ~ files", files);

    addNewFile(files[0]);
    setShowDropArea(false);
  };

  const [bond] = useDropArea({
    onFiles: (files) => handleDropFiles(files),
  });

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setShowDropArea(true);
    } else if (e.type === "dragleave") {
      setShowDropArea(false);
    }
  };

  return (
    <div className={`${styles.patternBackground} bg-[#8b8b8b] relative overflow-y-scroll`}>
      {
        showDropArea && (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...bond}
            className="bg-[#0008] absolute h-full w-full z-10 p-6"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
          >
            <div className={`${styles.dashedBorder} w-full h-full grid place-items-center`}>
              <span className="text-white text-lg">Drop files here</span>
            </div>
          </div>
        )
      }
      <div className="p-6 h-full" onDragEnter={handleDrag}>
        {children}
      </div>
    </div>
  );
}

export default FileArea;
