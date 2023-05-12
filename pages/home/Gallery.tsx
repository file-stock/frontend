import React, { FC, useEffect, useState } from "react";

interface GalleryProps {
  cid: string;
}

const Gallery: FC<GalleryProps> = ({ cid }) => {
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
      <div className="">
        {imageData && (
          <img
            className="rounded-lg w-[360px] h-[460px]"
            src={imageData}
            alt="image"
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
