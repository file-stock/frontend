import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";

const Gallery = () => {
  const { allFiles } = useContext(ThemeContext);

  const [selectedImages, setSelectedImages] = useState<any>([]);
  useEffect(() => {
    const getRandomImages = () => {
      if (!allFiles || allFiles.length === 0) {
        return;
      }

      const randomImagesMain = [];
      const numImagesToDisplay = 8;
      const filteredImages = allFiles.filter(
        (file) => file.watermarkedCid !== ""
      );

      for (let i = 0; i < numImagesToDisplay; i++) {
        const randomIndex = Math.floor(Math.random() * filteredImages.length);
        randomImagesMain.push(filteredImages[randomIndex]);
      }

      setSelectedImages(randomImagesMain);
    };

    getRandomImages();

    const interval = setInterval(() => {
      getRandomImages();
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, [allFiles]);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-6 w-fit mx-auto mt-20">
      {selectedImages &&
        selectedImages.map((card: any, i: any) => {
          return (
            <div key={i} className="w-[690px] mx-1 pr-0">
              <ImageCard cid={card.watermarkedCid} id={i} />
            </div>
          );
        })}
    </div>
  );
};

export default Gallery;
