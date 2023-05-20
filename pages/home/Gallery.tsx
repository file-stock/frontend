import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import ImageCard from "../../components/ImageCard";
interface GalleryProps {
  cid: string;
  key: any;
}

const Gallery: FC<GalleryProps> = ({ cid, key }) => {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    async function fetchImageData() {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
        const data = await response.text();
        setImageData(data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    }

    fetchImageData();
  }, [cid]);
  return (
    <div className="h-full">
      {imageData && (
        <img className="rounded-lg" src={imageData} alt="myImages" />
      )}
    </div>
  );
};

export default Gallery;
