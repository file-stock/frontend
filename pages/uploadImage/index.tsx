import React, { useState, useRef, useEffect, useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import Jimp from "jimp";
import { ThemeContext } from "../../context/context";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import GenericModal from "../../components/GenericModal";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<any>("");
  // const [preview, setPreview] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3 | number>(1);
  const [sinteticBaseEvent, setSinteticBaseEvent] = useState<any>();
  const [encryptedSinteticBaseEvent, setEncryptedSinteticBaseEvent] =
    useState<any>();
  const [title, setTitile] = useState<string>("");
  const [description, setDescription] = useState("");
  const [hashValue, setHashValue] = useState<any>("");
  const [encryptedHash, setEncryptedHash] = useState<any>("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [modalText, setModalText] = useState("1/3 Loading");

  const fileInputRef = useRef(null);

  const {
    setPrice,
    price,
    imgForSale,
    setImgForSale,
    preview,
    setPreview,
    selectedTags,
    selectedTagNumbers,
    contract,
    contractRights,
    userAddress,
    allFiles,
    setIsErrorPopupVisible,
    setPopupMessage,
  } = useContext(ThemeContext);

  const LIGHTHOUSE_API_KEY = "163c2684.1674563421dd41fda18350496ab201a2";

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    //  console.log("OBJ", objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  async function modifyFile(e: any) {
    let file = e.target.files[0];

    //  console.log("event", e);
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // @ts-ignore
      const image = await Jimp.read(reader.result);
      const watermarkedImg = await Jimp.read(
        `${window.location.origin}/images/icons/logoWM.png`
      );
      image.resize(800, Jimp.AUTO);

      watermarkedImg.resize(image.getWidth(), image.getHeight());

      image.blit(watermarkedImg, 0, 0);

      const base64 = await image.getBase64Async(Jimp.MIME_JPEG);
      const file = new File([base64], `${fileName}_resized`, {
        type: "image/jpeg",
      });
      // console.log("file", file); //console.log

      //new FileList which is the type of target.files
      let list = new DataTransfer();
      list.items.add(file);
      setEncryptedSinteticBaseEvent(sinteticBaseEvent);

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
        // console.log("hashValue uploadImage", hashValue);
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

  const applyAccessConditions = async (tokenId: string) => {
    setModalText("3/3 Applying Access Conditions in progress");
    console.log("cid di applyAccessConditions", encryptedHash);
    console.log("tokenId di applyaccessconditions", tokenId.toString());
    const conditions = [
      {
        id: 1,
        chain: "Calibration",
        method: "balanceOf",
        standardContractType: "ERC1155",
        contractAddress: "0xd99bAbF3F4b310e9D80ac396518112e552016608",
        returnValueTest: { comparator: ">=", value: "1" },
        parameters: [":userAddress", tokenId],
      },
    ];
    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature();
    const response = await lighthouse.accessCondition(
      publicKey,
      encryptedHash,
      signedMessage,
      conditions,
      aggregator
    );
    console.log("response di applyaccess", response);
    setModalText("3/3 Access Conditions Applied");
  };

  const progressCallback = (progressData: any) => {
    let percentageDone = 100 - progressData?.total / progressData?.uploaded;
    percentageDone = Number(percentageDone.toFixed(2));
  };

  const deploy = async () => {
    try {
      const output = await lighthouse.upload(
        sinteticBaseEvent,
        LIGHTHOUSE_API_KEY,
        progressCallback
      );
      console.log("output", output);
      return output.data.Hash;
    } catch (error) {
      console.log("error inside deploy :", error);
    }
  };

  const mergeImageForSale = () => {
    const newImgObject = {
      img: preview,
      title: title,
      description: description,
      price: price,
      tags: selectedTags,
      tagsId: selectedTagNumbers,
    };
    setImgForSale((prev: any) => [...prev, newImgObject]);
  };

  const deployEncrypted = async () => {
    if (encryptedSinteticBaseEvent) {
      console.log("from deployEncrypted", encryptedSinteticBaseEvent);
    }

    const sig = await encryptionSignature();
    //console.log();
    try {
      const response = await lighthouse.uploadEncrypted(
        encryptedSinteticBaseEvent,
        sig.publicKey,
        LIGHTHOUSE_API_KEY,
        sig.signedMessage,
        progressCallback
      );

      modifyFile(encryptedSinteticBaseEvent);
      console.log("response", response);
      return response.data.Hash;
    } catch (error) {
      console.error("Error uploading encrypted file", error);
      // Handle or throw error accordingly
    }
  };

  const handleFileChange = async () => {
    if (encryptedSinteticBaseEvent) {
      mergeImageForSale();

      setEncryptedHash(await deployEncrypted());
      console.log("encryptedHash fuori evento", encryptedHash);
    }
  };

  useEffect(() => {
    let isHandlingEvent = false;

    const handleStartUpload = async (value1: any, value2: any, value3: any) => {
      if (isHandlingEvent) return;
      isHandlingEvent = true;
      console.log("encryptedHash nell'evento", encryptedHash);
      console.log("value3 nell'evento", value3.toString());
      try {
        setModalText("2/3 Finalizing transaction in progress");
        const tx = await contract.finalizeUpload(value3, encryptedHash);
        await tx.wait();
        await applyAccessConditions(value3);
        setStep(3);

        setIsPopUpOpen(false);
        console.log("Transaction:", tx);
      } catch (error) {
        setPopupMessage("Error: Image not finalized");
        setIsErrorPopupVisible(true);
        setIsPopUpOpen(false);
        console.error("Transaction failed: ", error);
      } finally {
        setTimeout(() => {
          setIsErrorPopupVisible(false);
        }, 2500);
        isHandlingEvent = false;
      }
    };

    if (contract) {
      contract.on("StartUpload", handleStartUpload);
    }

    return () => {
      if (contract) {
        contract.off("StartUpload", handleStartUpload);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, encryptedHash]);

  const startUpload = async (hash: any, tags: any) => {
    console.log("startUpload", hash);
    setModalText("1/3 Transaction in progress");
    if (!contract || !price) return;
    const tx = await contract.startUpload(
      hash,
      ethers.utils.parseEther(price.toString()),
      tags
    );
    await tx.wait();
    console.log("after transaction", tx);
    console.log("encrypted hash dopo transazione", encryptedHash);
  };

  useEffect(() => {
    if (hashValue) {
      const completeUpload = async () => {
        setIsPopUpOpen(true);
        try {
          console.log("selectedTagNumbers", selectedTagNumbers);
          console.log("hashValue", hashValue);
          await startUpload(hashValue, selectedTagNumbers);
        } catch (error) {
          setIsPopUpOpen(false);
          setIsErrorPopupVisible(true);
          setPopupMessage("User denied transaction");
          console.error("There was an error uploading:", error);
        } finally {
          setTimeout(() => {
            setIsErrorPopupVisible(false);
          }, 2500);
        }
      };
      completeUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashValue]);

  return (
    <div className="px-[140px] pt-[60px]">
      <GenericModal
        open={isPopUpOpen}
        loader={true}
        label={modalText}
        description="the operation may take a few seconds"
      />

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
