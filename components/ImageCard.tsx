import { FC } from "react";
import Image from "next/image";
import { favouriteIcon } from "../public";
import Link from "next/link";

type ImageCardProps = {
  title: string;
  description: string;
  img: any;
  onClick?: (id: any) => void;
  id: number;
  favorite: any;
};

const ImageCard: FC<ImageCardProps> = ({
  title,
  description,
  img,
  onClick,
  id,
  favorite,
}) => {
  return (
    <div className="relative w-[390px] h-[460px]">
      <Image src={img} fill={true} alt="myImages" className="rounded-lg" />
      <div className="flex flec-col text-white">
        <div className="absolute bottom-24 left-5 text-2xl font-bold">
          {title}
        </div>
        <div className="absolute bottom-10 left-5 text-lg font-medium border border-white rounded-xl py-0.5 px-6">
          <Link href="/buyImage">Buy</Link>
        </div>
      </div>
      <div
        className={`absolute right-2 top-2 w-5 h-5 p-2 rounded-full ${
          favorite.includes(id) ? "bg-error" : ""
        }`}
        onClick={onClick}
      >
        <Image src={favouriteIcon} fill={true} alt="fav" />
      </div>
    </div>
  );
};

export default ImageCard;
