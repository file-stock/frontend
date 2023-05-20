/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/context";
import { utils } from "ethers";
import GenericButton from "../../components/GenericButton";
import Watermark from "@uiw/react-watermark";
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

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    allFiles,
    callBuyFile,
    price,
    setPrice,
    selectedTags,
    setSelectedTags,
  } = useContext(ThemeContext);
  const [imageData, setImageData] = useState("");
  const [cid, setCid] = useState(null);
  // const [price, setPrice] = useState<any>();
  // const style = {
  //   width: "100%",
  //   maxWidth: "100%",
  //   height: 500,
  //   display: "block",
  //   background: "#fff",
  // };

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
    fetchImageData();
  }, [cid]);

  return (
    <>
      <div className="flex flex-col lg:pb-[180px] pb-[100px] px-[60px] lg:px-[140px] pt-10 ">
        <div className="flex justify-center">
          {/* <Watermark
          content="File-Stock"
          fontSize={30}
          fontColor="gray"
         // style={style}
          className="w-fit "
        > */}
          <div className="relative flex items-center  justify-center mb-[40px]  h-[500px]">
            <img
              src={imageData}
              alt="Selected image"
              className=" w-fit h-full object-cover rounded-xl"
            />
          </div>
          {/* </Watermark> */}
        </div>
        <div className="flex items-center justify-between gap-2 mb-[25px]">
          <div className="text-5xl font-extrabold">Title of the image</div>
          <div className="flex justify-between">
            <GenericButton
              label="Buy Image"
              variant="mainFull"
              size="md"
              onclick={() => callBuyFile(id, price)}
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
            {price}
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
              <div className="text-xl ">{selectedTags.join(" - ")}</div>
            </div>
          </div>
        </div>
        <div className="border-b border-border pb-[50px]">
          <div className="text-lg text-greyText mb-[30px]">Owned by</div>
          <ProfileUserPicture />
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
