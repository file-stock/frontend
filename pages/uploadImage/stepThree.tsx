import Link from "next/link";
import { FC, useEffect } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import lighthouse from "@lighthouse-web3/sdk";

type StepThreeProps = {
  imageForSale: any[];
};

const StepThree: FC<StepThreeProps> = ({ imageForSale }) => {
  useEffect(() => {
    const getFiles = async () => {
      // const lighthouse = require("@lighthouse-web3/sdk");
      const uploads = await lighthouse.getUploads(
        "0x65d46FA545aD86A139647351786D17Bf46C173dC"
      );
      console.log("UPLOADS", uploads);
    };
    getFiles();
  }, []);

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
