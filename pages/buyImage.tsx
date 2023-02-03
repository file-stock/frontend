import { FC, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../context/context";

import {
  downloadIcon,
  uploadIcon,
  filecoinIcon,
  imageLicenzeIcon,
  roundedIcon,
  creatorSample,
} from "../public";
import GenericButton from "../components/GenericButton";
import ProfileUserPicture from "../components/ProfileUserPicture";

type StepThreeProps = {
  preview: string;
  title: string;
  description: string;
};

const StepThree: FC<StepThreeProps> = ({ preview, title, description }) => {
  const { price } = useContext(ThemeContext);

  const liscenses = [
    "For commercial and personal projects",
    "On digital or printed media",
    "To make modifications and create derivative works",
    "From anywhere in the world",
    "For an unlimited number of times",
  ];

  return (
    <>
      <div className="flex flex-col pb-[180px]">
        <div className="w-full flex items-center justify-center mb-[40px]">
          <Image
            src={preview}
            height={500}
            width={500}
            alt="uploadImage"
            className="rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between gap-2 mb-[25px]">
          <div className="text-5xl font-extrabold">{title}</div>
          <div className="flex justify-between">
            <GenericButton
              label="Buy Image"
              variant="mainFull"
              size="md"
              onclick={() => console.log("")}
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
            {price}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="text-lg text-greyText mb-[2px]">Description</div>
          <div className="text-xl">{description}</div>
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
            <div className="text-3xl font-semibold">Image Liscenze</div>
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
