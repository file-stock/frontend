/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/context";
import { utils } from "ethers";
import PopupMessage from "../../components/PopupMessage";
import GenericModal from "../../components/GenericModal";
import GenericButton from "../../components/GenericButton";
import {
  downloadIcon,
  uploadIcon,
  filecoinIcon,
  imageLicenzeIcon,
  roundedIcon,
} from "../../public";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Image from "next/image";
import { tags } from "../../public/tags";
import { ethers } from "ethers";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    allFiles,
    price,
    setPrice,
    selectedTags,
    setSelectedTags,
    contract,
    setIsErrorPopupVisible,
    isErrorPopupVisible,
    popupMessage,
    setPopupMessage,
  } = useContext(ThemeContext);
  const [imageData, setImageData] = useState<any>();
  const [cid, setCid] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const data = allFiles.find(
    (data) => data.tokenId.toNumber() === parseInt(id as string)
  );
  const [showFullAddress, setShowFullAddress] = useState(false);

  const handleAddressClick = () => {
    setShowFullAddress(!showFullAddress);
  };

  const displayAddress =
    data && data.creator
      ? showFullAddress
        ? data.creator
        : data.creator.slice(0, 5) + "..."
      : "Loading address";

  const liscenses = [
    "For commercial and personal projects",
    "On digital or printed media",
    "To make modifications and create derivative works",
    "From anywhere in the world",
    "For an unlimited number of times",
  ];

  useEffect(() => {
    if (typeof id === "string") {
      const imageData = allFiles.find(
        (image) => image.tokenId.toNumber() === parseInt(id)
      );

      setImageData(imageData);
      if (imageData) {
        setCid(imageData.watermarkedCid);
        const etherPrice = utils.formatEther(imageData.price);
        setPrice(etherPrice);
        const tagIds = imageData.fileTags.map((tag: any) => tag.toNumber());
        const tagNames = tagIds.map((id: any) => tags[id.toString()]);
        setSelectedTags(tagNames);
      }
    }
  }, [id, allFiles, setPrice, setSelectedTags]);

  useEffect(() => {
    async function fetchImageData() {
      if (cid) {
        try {
          const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.text();
          setImageData(data);
        } catch (error) {
          console.log("Error fetching image data", error);
        }
      }
    }

    fetchImageData();
  }, [cid]);

  const callBuyFile = async (id: any) => {
    console.log("callBuyFile", id);
    setIsPopUpOpen(true);
    try {
      const amount = ethers.utils.parseEther(price);
      console.log(amount.toString());
      const tx = await contract.buyFile(id, {
        value: amount,
      });
      await tx.wait();
      setIsPopUpOpen(false);
      console.log("buyfile", tx);
    } catch (error: any) {
      if (error.code === "UNPREDICTABLE_GAS_LIMIT"){
        setPopupMessage("You don't have enough funds")
      } else if (error.code === "INVALID_ARGUMENT"){
        setPopupMessage("Image not found")
      } else if (error.code === -32603) {
        setPopupMessage("Can't load image");
      } else if (error.code === "ACTION_REJECTED") {
        setPopupMessage("User denied transaction");
      } else {
        setPopupMessage("Error")
      }
      setIsPopUpOpen(false);
      setIsErrorPopupVisible(true);
      console.error("Transaction failed: ", error.code);
    } finally {
      setTimeout(() => {
        setIsErrorPopupVisible(false);
      }, 2500);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:pb-[180px] pb-[100px] px-[60px] lg:px-[140px] pt-10 ">
        <PopupMessage
          isVisible={isErrorPopupVisible}
          message={popupMessage}
          onClose={() => setIsErrorPopupVisible(false)}
        />
        <GenericModal
          open={isPopUpOpen}
          loader={true}
          label="Loading"
          description="the operation may take a few seconds"
        />
        <div className="flex justify-center">
          <div className="relative flex items-center  justify-center mb-[40px] h-[800px]">
            <img
              src={imageData}
              alt="Selected image"
              className=" w-fit h-full object-cover rounded-xl"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-greyText animate-spin dark:text-gray-600 fill-main"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Loading image...
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mb-[25px]">
          <div className="text-5xl font-extrabold">Title of the image</div>
          <div className="flex justify-between">
            <GenericButton
              label="Buy Image"
              variant="mainFull"
              size="md"
              onclick={() => callBuyFile(id)}
            />
            {/* <div className="flex items-center justify-between ml-4 gap-4 py-2 px-6 border border-main rounded-lg cursor-pointer text-lg font-bold">
              <Image src={uploadIcon} height={15} width={15} alt="upload" />
              <div className="text-main font-bold">Try Photo</div>
            </div>
            <div className="flex items-center justify-between ml-4 gap-2 py-4 px-6 border border-main rounded-lg cursor-pointer text-lg font-bold">
              <Image src={downloadIcon} height={15} width={15} alt="download" />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-[30px]">
          <div className="text-lg text-greyText">Image price</div>
          <div className="flex items-center  text-3xl font-semibold gap-3">
            <Image src={filecoinIcon} width={15} height={15} alt="filecoin" />
            {price ? price : "Loading price"}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex justify-between items-center">
            <div className="text-lg text-greyText mb-[2px]">Description</div>
            <div className="text-lg text-greyText mr-[370px]">Tags:</div>
          </div>
          <div className="flex gap-5 items-center justify-between">
            <div className="text-xl">{/*description*/}</div>
            <div className="text-lg mr-[100px] ">
              <div className="text-xl ">
                {price ? selectedTags.join(" - ") : "Loading tags"}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-border pb-[50px]">
          <div className="text-lg text-greyText mb-[30px]">Owned by</div>
          <div
            onClick={handleAddressClick}
            className="text-xl font-semibold cursor-pointer w-fit"
          >
            {displayAddress}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 pt-[30px]  mb-[36px]">
            <Image
              src={imageLicenzeIcon}
              width={20}
              height={20}
              alt="imageLicenze"
            />
            <div className="text-3xl font-semibold">Image License</div>
          </div>
          <div className="grid grid-cols-3 mb-[30px]">
            {liscenses.map((liscense, i) => {
              return (
                <div
                  className="flex gap-2 items-center mr-[100px] mb-[25px]"
                  key={i}
                >
                  <Image
                    src={roundedIcon}
                    width={18}
                    height={18}
                    alt="rounded"
                  />
                  <div className="text-xl">{liscense}</div>
                </div>
              );
            })}
          </div>
          <div>
            <a
              href="#"
              className="text-xl text-main underline underline-offset-4"
            >
              View complete liscense
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
