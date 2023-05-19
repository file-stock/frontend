import Link from "next/link";
import { FC, useEffect, useContext, useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import lighthouse from "@lighthouse-web3/sdk";
import { ThemeContext } from "../../context/context";

type StepThreeProps = {
  imageForSale: any[];
};

const StepThree: FC<StepThreeProps> = ({ imageForSale }) => {
  const { userAddress } = useContext(ThemeContext);

  useEffect(() => {
    const getFiles = async () => {
      // const lighthouse = require("@lighthouse-web3/sdk");
      try {
        const uploads = await lighthouse.getUploads(
          //"310ae584-7656-4940-b42f-397d73cfca5f"
          userAddress
        );
        console.log("UPLOADS", uploads);
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    getFiles();
  }, [userAddress]);

  return (
    <div className="pb-[128px]">
      <div className="flex gap-4  mb-20 items-center">
        <div className="text-3xl font-bold">successfully uploaded!</div>
        <div className="text-2xl font-semibold">
          Go to
          <Link
            href="/myProfile"
            className="underline underline-offset-4 mx-2 text-main font-serif"
          >
            my Profile
          </Link>
          to see all your pictures
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        {imageForSale &&
          imageForSale.map((card: any, i: any) => {
            console.log("CARD", card);
            console.log("Blob URL:", card.img);
            return (
              <div key={i} className="flex gap-5">
                <ImageCardForSale
                  img={card.img}
                  title={card.title}
                  description={card.description}
                  price={card.price}
                  downloadButton={false}
                  tags={card.tags}
                  tagsId={card.tagsId}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StepThree;
