/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Image from "next/image";
import { favouriteIcon } from "../public";
import Link from "next/link";
import { useEffect, useState } from "react";

type ImageCardProps = {
  title?: string;
  description?: string;
  img?: any;
  onClick?: (id: any) => void;
  id: number;
  favorite?: any;
  className?: string;
  downloadButton?: boolean;
  cid?: string;
};

const ImageCard: FC<ImageCardProps> = ({
  title,
  description,
  img,
  onClick,
  id,
  favorite,
  className,
  cid,
  downloadButton,
}) => {
  const [imageData, setImageData] = useState("");

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
    <div
      className={`relative w-[420px] group h-[460px] transform transition-transform hover:scale-110 hover:border hover:border-border rounded-lg`}
    >
      <Link href={`/detail?id=${id}`}>
        <img
          src={imageData}
          //fill={true}
          alt="myImages"
          className="rounded-lg h-full"
        />
      </Link>

      <div>
        <div className="flex flec-col text-white">
          <div className="absolute bottom-24 left-5 text-2xl font-bold">
            {title}
          </div>
          {/* {buyLink ? (
      <div className="absolute bottom-10 left-5 text-lg font-medium border border-white rounded-xl py-0.5 px-6">
        <Link href={buyLink}>Buy</Link>
      </div>
    ) : ( */}
          <div className="absolute bottom-10 left-5 text-sm font-normal">
            {description}
          </div>
        </div>

        {favorite && (
          <div
            className={`absolute opacity-0 group-hover:opacity-100 right-2 top-2 w-5 h-5 p-2 rounded-full ${
              favorite.includes(id) ? "bg-error" : ""
            }`}
            onClick={onClick}
          >
            <Image src={favouriteIcon} fill={true} alt="fav" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
