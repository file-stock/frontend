import React, { useState, useRef, useEffect } from "react";
import Jimp, { getBase64Async } from "jimp";
import lighthouse from "@lighthouse-web3/sdk";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

function UploadImage() {
  const [resizedImage, setResizedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sinteticBaseEvent, setSinteticBaseEvent] = useState<any>();
  const [title, setTitile] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const fileInputRef = useRef(null);

  const API_KEY = "310ae584-7656-4940-b42f-397d73cfca5f";

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
    setSinteticBaseEvent(e);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile("");
      return;
    }
    setSelectedFile(e.target.files[0]);
    setStep(2);
  };

  const onChangeTitle = (e: any) => {
    setTitile(e.target.value);
  };

  const progressCallback = (progressData: any) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async () => {
    // Push file to lighthouse node
    console.log("run");
    const output = await lighthouse.upload(
      sinteticBaseEvent,
      API_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  const uploadOnLightHouse = () => {
    if (title.length < 1) {
      return;
    }
    setStep(3);
    if (sinteticBaseEvent) {
      deploy();
    }
  };

  // const handleFileChange = async () => {
  //   const file = fileInputRef.current.files[0];
  //   console.log("file", file);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = async () => {
  //     const image = await Jimp.read(reader.result);
  //     await image.resize(200, 200);
  //     console.log("image", image);
  //     const base64 = await image.getBase64Async(Jimp.MIME_JPEG);
  //     const file = new File([base64], "image.jpg", {
  //       type: "image/jpeg",
  //     });
  //     setResizedImage(base64);
  //     setResized(true);
  //     deploy(file.name);
  //   };
  // };

  return (
    <div className="px-[140px] pt-[60px]">
      {step === 1 ? (
        <>
          <StepOne
            onSelectFile={onSelectFile}
            fileInputRef={fileInputRef}
            selectedFile={selectedFile}
            preview={preview}
          />
        </>
      ) : step === 2 ? (
        <>
          <StepTwo
            onSelectFile={onSelectFile}
            fileInputRef={fileInputRef}
            selectedFile={selectedFile}
            preview={preview}
            uploadOnLightHouse={uploadOnLightHouse}
            onChangeTitle={onChangeTitle}
            setTitle={setTitile}
            setPrice={setPrice}
          />
        </>
      ) : (
        <>
          <StepThree preview={preview} title={title} price={price} />
        </>
      )}
    </div>
  );
}

export default UploadImage;
