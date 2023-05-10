import React, { FC, useEffect, useState } from "react";
import Image from "next/image";


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
    <div className="">
      {imageData && (

        <img // check ivonna quale delle due img usare
          className="w-[200px] h-[200px] rounded-lg animate-scrollLeft"
          src={imageData}
          alt="my images"

     //   <Image
      //    className="rounded-lg animate-scrollLeft"
      //    src={imageData}
      //    alt="image"
     //     width={400}
      //    height={400}

        />
      )}
      <div className="mt-4">
        {imageData && (

          <img // check ivonna quale delle due img usare
            className="w-[200px] h-[200px] rounded-lg animate-scrollRight"
            src={imageData}
            alt="my images"

     //     <Image
      //      className="rounded-lg animate-scrollRight"
      //      src={imageData}
       //     alt="image"
     //       width={400}
        //    height={400}

          />
        )}
      </div>
    </div>
  );
};

export default Gallery;