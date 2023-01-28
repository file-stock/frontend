import React, { useState, useRef, useEffect } from "react";
import Jimp, { getBase64Async } from "jimp";
import Image from "next/image";
import lighthouse from "@lighthouse-web3/sdk";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import download from "../../public/images/download2.png";
import upload from "../../public/images/download.png";

function UploadImage() {
  const [resizedImage, setResizedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sinteticBaseEvent, setSinteticBaseEvent] = useState<any>();
  const [title, setTitile] = useState<string>("");
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
            deploy={deploy}
            onChangeTitle={onChangeTitle}
            setTitle={setTitile}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-center mb-14">
              <Image
                src={preview}
                height={500}
                width={500}
                alt="uploadImage"
                className="rounded-xl"
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-3xl font-bold">{title}</div>
              <div className="flex justify-between">
                <button className="bg-main text-white py-4 px-6 rounded-lg">
                  Buy Image
                </button>
                <div className="flex items-center justify-between ml-4 gap-4 py-2 px-6 border border-main rounded-lg cursor-pointer">
                  <Image src={upload} height={15} width={15} alt="upload" />
                  <div className="text-main font-bold">Try Photo</div>
                </div>
                <div className="flex items-center justify-between ml-4 gap-2 py-4 px-6 border border-main rounded-lg cursor-pointer">
                  <Image src={download} height={15} width={15} alt="download" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadImage;
