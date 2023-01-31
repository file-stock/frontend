import { FC, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../../context/context";

import download from "../../public/images/download2.png";
import upload from "../../public/images/download.png";
import filecoin from "../../public/images/filecoin.png";
import creator from "../../public/images/creator.png";
import imageLicenze from "../../public/images/imageLicenze.png";
import rounded from "../../public/images/rounded.png";

import GenericButton from "../../components/GenericButton";

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
              <Image src={upload} height={15} width={15} alt="upload" />
              <div className="text-main font-bold">Try Photo</div>
            </div>
            <div className="flex items-center justify-between ml-4 gap-2 py-4 px-6 border border-main rounded-lg cursor-pointer text-lg font-bold">
              <Image src={download} height={15} width={15} alt="download" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-[30px]">
          <div className="text-lg text-greyText">Image price</div>
          <div className="flex items-center  text-3xl font-semibold gap-3">
            <Image src={filecoin} width={15} height={15} alt="filecoin" />
            {price}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="text-lg text-greyText mb-[2px]">Description</div>
          <div className="text-xl">{description}</div>
        </div>
        <div className="border-b border-border pb-[50px]">
          <div className="text-lg text-greyText mb-[30px]">Owned by</div>
          <div className="flex gap-6 items-center w-2/5">
            <Image src={creator} width={200} height={200} alt="creator" />
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">Jacon Moore</div>
              <div className="text-lg text-greyText">
                ↓ Instagram Subscription will really support me ♡ Thank you! I
                love vintage, art and clear aesthetic!
              </div>
              <button className="text-sm font-bold text-greyText bg-[#E5E7EB] py-2 px-4 rounded-lg w-1/4">
                View profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 pt-[30px]  mb-[36px]">
            <Image
              src={imageLicenze}
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
                  <Image src={rounded} width={18} height={18} alt="rounded" />
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
