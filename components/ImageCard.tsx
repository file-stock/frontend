/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Image from "next/image";
import { favouriteIcon } from "../public";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import GenericModal from "./GenericModal";
import { useRouter } from "next/router";
import { ThemeContext } from "../context/context";

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
  buyNowButton?: boolean;
  addToCartButton?: boolean;
  price?: any;
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
  buyNowButton,
  addToCartButton,
  price,
}) => {
  const { cart, setCart, isConnected } = useContext(ThemeContext);
  const [imageData, setImageData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

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

  const handleMouseEnter = () => {
    if (isConnected) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isConnected) setIsHovered(false);
  };

  const handleBuyNowClick = () => {
    router.push(`/detail?id=${id}`);
  };

  const addToCart = (imageId: number, cid: any, price: any) => {
    const existingItem = cart.find((item) => item.imageId === imageId);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      const newItem = {
        imageId,
        cid,
        price,
        quantity: 1,
        selected: true,
      };
      setCart([...cart, newItem]);
    }
  };

  return (
    <div
      className={`relative w-[420px] group h-[460px] transform transition-transform hover:scale-110 hover:border hover:border-border rounded-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/detail?id=${id}`}>
        <img
          src={imageData}
          //fill={true}
          alt="myImages"
          className="rounded-lg h-full w-full"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-greyText animate-spin dark:text-gray-600 fill-main"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            Loading image...
          </div>
        )}
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
        {isHovered && addToCartButton && (
          <div className="absolute flex justify-center items-center group-hover:opacity-100 inset-0 bg-black bg-opacity-70 transition-opacity duration-300 opacity-0">
            {buyNowButton && (
              <button
                className="mx-2 py-2 px-4 bg-green-500 text-white rounded hover:text-lg hover:underline"
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>
            )}
            {addToCartButton && (
              <button
                className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:text-lg hover:underline"
                onClick={() => addToCart(id, cid, price)}
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
