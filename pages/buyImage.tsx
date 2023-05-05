import { FC, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../context/context";
import Watermark from "@uiw/react-watermark";

import {
  downloadIcon,
  uploadIcon,
  filecoinIcon,
  imageLicenzeIcon,
  roundedIcon,
  creatorSample,
  tree,
} from "../public";
import GenericButton from "../components/GenericButton";
import ProfileUserPicture from "../components/ProfileUserPicture";
import { horse } from "../public";

type StepThreeProps = {
  preview: string;
  title: string;
  description: string;
};

const StepThree: FC<StepThreeProps> = ({ title, description }) => {
  const { price, preview, callBuyFile } = useContext(ThemeContext);

  const style = {
    width: "100%",
    maxWidth: "100%",
    height: 200,
    display: "block",
  };
  const text = "file-stock";

  const liscenses = [
    "For commercial and personal projects",
    "On digital or printed media",
    "To make modifications and create derivative works",
    "From anywhere in the world",
    "For an unlimited number of times",
  ];

  return (
    <>
      <div className="flex flex-col pb-[180px] px-[140px] pt-10">
        <Watermark
          content="File-Stock"
          fontSize={20}
          fontColor="gray"
          style={{ background: "#fff" }}
        >
          <div className="relative flex items-center justify-center mb-[40px] h-[500px]">
            <Image
              src={horse}
              fill={true}
              alt="uploadImage"
              className="rounded-xl"
              priority={true}
              height={500}
              width={300}
            />
            <textarea style={style} spellCheck={false} defaultValue={text} />
          </div>
        </Watermark>
        <div className="flex items-center justify-between gap-2 mb-[25px]">
          <div className="text-5xl font-extrabold">{title}</div>
          <div className="flex justify-between">
            <GenericButton
              label="Buy Image"
              variant="mainFull"
              size="md"
              onclick={() => callBuyFile()}
            />
            <div className="flex items-center justify-between ml-4 gap-4 py-2 px-6 border border-main rounded-lg cursor-pointer text-lg font-bold">
              <Image src={uploadIcon} height={15} width={15} alt="upload" />
              <div className="text-main font-bold">Try Photo</div>
            </div>
            <div className="flex items-center justify-between ml-4 gap-2 py-4 px-6 border border-main rounded-lg cursor-pointer text-lg font-bold">
              <Image src={downloadIcon} height={15} width={15} alt="download" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-[30px]">
          <div className="text-lg text-greyText">Image price</div>
          <div className="flex items-center  text-3xl font-semibold gap-3">
            <Image src={filecoinIcon} width={15} height={15} alt="filecoin" />
            0.2
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex justify-between items-center">
            <div className="text-lg text-greyText mb-[2px] ">Description</div>
            <div className="text-lg text-greyText mr-[370px]">Tags:</div>
          </div>
          <div className="flex gap-5 items-center justify-between">
            <div className="text-xl">
              An horse galloping on a flaming background
            </div>
            <div className="text-lg mr-[180px]">
              <div className="text-xl">nature, horse, landscape</div>
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

export default StepThree;
