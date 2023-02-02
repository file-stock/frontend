import { FC } from "react";
import Image from "next/image";

import filecoin from "../../public/images/filecoin.png";
import imageLicenze from "../../public/images/imageLicenze.png";
import trash from "../../public/images/delete.png";

type StepFourProps = {
  img: any;
  title: string;
  description: string;
  price: any;
};

const StepFour: FC<StepFourProps> = ({ img, title, description, price }) => {
  return (
    <div className="pb-[128px]">
      <div className="text-3xl font-extrabold mb-20">My Image Licenses:</div>
      <div className="flex gap-5">
        <div className="relative w-[330px] h-[280px]">
          <Image src={img} fill={true} alt="myImages" className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex items-center  text-3xl font-semibold gap-3">
            <Image src={filecoin} width={15} height={15} alt="filecoin" />
            {price}
          </div>
          <div className="text-md max-w-[420px]">{description}</div>
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-main text-white py-2 px-4 cursor-pointer rounded-lg font-semibold text-lg">
                Download Image
              </div>
              <div className="border border-border rounded-lg py-3.5 px-4 cursor-pointer">
                <Image src={trash} width={15} height={15} alt="delete" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={imageLicenze}
              width={10}
              height={10}
              alt="img-licenze"
            />
            <div className="text-main cursor-pointer text-xs underline underline-offset-4">
              View and manage liscense
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
