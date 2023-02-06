import React, { useState, useRef, useEffect, useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import Jimp from "jimp";
import { ThemeContext } from "../../context/context";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<any>("");
  // const [preview, setPreview] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3 | number>(1);
  const [sinteticBaseEvent, setSinteticBaseEvent] = useState<any>();
  const [encryptedSinteticBaseEvent, setEncryptedSinteticBaseEvent] =
    useState<any>();
  const [title, setTitile] = useState<string>("");
  const [description, setDescription] = useState("");
  const [accessConditionCid, setAccessConditionCid] = useState("");
  const [hashValue, setHashValue] = useState("");

  const fileInputRef = useRef(null);

  const { setPrice, price, imgForSale, setImgForSale, preview, setPreview } =
    useContext(ThemeContext);

  const LIGHTHOUSE_API_KEY = "310ae584-7656-4940-b42f-397d73cfca5f";

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("OBJ", objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  async function modifyFile(e: any) {
    const file = e.target.files[0];

    console.log("event", e);
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // @ts-ignore
      const image = await Jimp.read(reader.result);
      image.resize(200, 200);
      const base64 = await image.getBase64Async(Jimp.MIME_JPEG);
      const file = new File([base64], `${fileName}_resized`, {
        type: "image/jpeg",
      });

      //new FileList which is the type of target.files
      let list = new DataTransfer();
      list.items.add(file);
      setEncryptedSinteticBaseEvent(e);

      setSinteticBaseEvent(() => {
        // let newState = e;
        // newState.target.files = null;
        let newState = e;
        newState.target.files = list.files;
        return newState;
      });
    };
  }

  useEffect(() => {
    if (sinteticBaseEvent) {
      const handleSynthetic = async () => {
        setHashValue(await deploy());
      };
      handleSynthetic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sinteticBaseEvent]);

  const onSelectFile = async (e: any) => {
    setEncryptedSinteticBaseEvent(e);

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

  const encryptionSignature = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const applyAccessConditions = async () => {
    // CID on which you are applying encryption
    const cid = accessConditionCid;

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Optimism",
        method: "getBlockNumber",
        standardContractType: "ERC1155",
        returnValueTest: {
          comparator: ">=",
          value: "13349",
        },
      },
    ];

    // Aggregator is what kind of operation to apply to access conditions
    // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response);
  };

  const progressCallback = (progressData: any) => {
    let percentageDone = 100 - progressData?.total / progressData?.uploaded;
    percentageDone = Number(percentageDone.toFixed(2));
  };

  const deploy = async () => {
    // Push file to lighthouse node
    console.log("run deploy", sinteticBaseEvent);
    const output = await lighthouse.upload(
      sinteticBaseEvent,
      LIGHTHOUSE_API_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
    return output.data.Hash;
  };

  const mergeImageForSale = () => {
    const newImgObject = {
      img: preview,
      title: title,
      description: description,
      price: price,
    };
    setImgForSale((prev: any) => [...prev, newImgObject]);
  };

  const deployEncrypted = async () => {
    if (encryptedSinteticBaseEvent) {
      console.log("from deployEncrypted", encryptedSinteticBaseEvent);
    }
    /*
       uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
       - publicKey: wallets public key
       - accessToken: your api key
       - signedMessage: message signed by the owner of publicKey
    */
    const sig = await encryptionSignature();
    console.log();
    const response = await lighthouse.uploadEncrypted(
      encryptedSinteticBaseEvent,
      sig.publicKey,
      LIGHTHOUSE_API_KEY,
      sig.signedMessage,
      progressCallback
    );
    console.log(response);
    setAccessConditionCid(response.data.Hash);
    modifyFile(encryptedSinteticBaseEvent);
  };

  const handleFileChange = async () => {
    if (title.length < 1) {
      return;
    }
    if (encryptedSinteticBaseEvent) {
      mergeImageForSale();
      deployEncrypted();

      // return await deploy();
    }
  };

  return (
    <div className="px-[140px] pt-[60px]">
      {step === 1 ? (
        <>
          <StepOne
            onSelectFile={onSelectFile}
            fileInputRef={fileInputRef}
            selectedFile={selectedFile}
            setEncriptedSinteticBaseEvent={setEncryptedSinteticBaseEvent}
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
            hashValue={hashValue}
          />
        </>
      ) : (
        <>
          <StepThree imageForSale={imgForSale} />
        </>
      )}
    </div>
  );
}

export default UploadImage;
