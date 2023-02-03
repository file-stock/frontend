import React, { useState, useRef, useEffect, useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import Jimp from "jimp";
import { ThemeContext } from "../../context/context";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [preview, setPreview] = useState("");
  const [step, setStep] = useState<1 | 2 | 3 | number>(1);
  const [sinteticBaseEvent, setSinteticBaseEvent] = useState<any>();
  const [title, setTitile] = useState<string>("");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef(null);

  const { setPrice, price } = useContext(ThemeContext);

  const LIGHTHOUSE_API_KEY = "310ae584-7656-4940-b42f-397d73cfca5f";

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (e: any) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // @ts-ignore
      const image = await Jimp.read(reader.result);
      await image.resize(200, 200);
      const base64 = await image.getBase64Async(Jimp.MIME_JPEG);
      const file = new File([base64], `${fileName}_resized`, {
        type: "image/jpeg",
      });

      //new FileList which is the type of target.files
      let list = new DataTransfer();
      list.items.add(file);

      await setSinteticBaseEvent(e);
      await setSinteticBaseEvent((prevState: any) => {
        let newState = prevState;
        newState.target.files = list.files;
        return { newState }; //to fix beacause returns an object with a newstate object inside
      });
    };

    console.log(sinteticBaseEvent);
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
    let percentageDone = 100 - progressData?.total / progressData?.uploaded;
    percentageDone = Number(percentageDone.toFixed(2));
    console.log(percentageDone);
  };

  const deploy = async () => {
    // Push file to lighthouse node
    console.log("run");
    const output = await lighthouse.upload(
      sinteticBaseEvent.newState,
      LIGHTHOUSE_API_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
    return output.data.Hash;
  };

  const handleFileChange = async () => {
    if (title.length < 1) {
      return;
    }
    if (sinteticBaseEvent) {
      return await deploy();
    }
  };

  console.log("step zero");

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
            onChangeTitle={onChangeTitle}
            setTitle={setTitile}
            // @ts-ignore
            setPrice={setPrice}
            setStep={setStep}
            setDescription={setDescription}
            handleFileChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <StepThree
            img={preview}
            title={title}
            description={description}
            price={price}
          />
        </>
      )}
    </div>
  );
}

export default UploadImage;
