import { useEffect, useState } from "react";
import Image from "next/image";
import Watermark from "@uiw/react-watermark";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <div className="text-2xl text-center">Home</div>
      <input type="file" onChange={onSelectFile} />
      {selectedFile && (
        <div className="w-96">
          <Watermark
            content="FILESTOCK"
            rotate={20}
            gapX={5}
            width={100}
            gapY={80}
            height={5}
            fontSize={20}
            fontColor="green"
            style={{ background: "#fff" }}
          >
            <Image src={preview} width={500} height={500} alt="image" />
          </Watermark>
        </div>
      )}
    </>
  );
}
