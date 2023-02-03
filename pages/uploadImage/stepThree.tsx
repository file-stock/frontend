import Link from "next/link";
import { FC, useEffect, useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";

type StepThreeProps = {
  imageForSale: any[];
};

const StepThree: FC<StepThreeProps> = ({ imageForSale }) => {
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
        {imageForSale.map((card: any, i: any) => {
          return (
            <div key={i} className="flex gap-5">
              <ImageCardForSale
                img={card.img}
                title={card.title}
                description={card.description}
                price={card.price}
                downloadButton={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepThree;
