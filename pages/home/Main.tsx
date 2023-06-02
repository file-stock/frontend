import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/context";
import GenericButton from "../../components/GenericButton";
import Link from "next/link";
import ImageCard from "../../components/ImageCard";
import React from "react";

const Main = () => {
  const [favorite, setFavorite] = useState<any[]>([]);
  const [selectedImagesMain, setSelectedImagesMain] = useState<any[]>([]);
  const { allFiles } = useContext(ThemeContext);

  useEffect(() => {
    const getRandomImages = () => {
      if (!allFiles || allFiles.length === 0) {
        return;
      }

      const randomImagesMain = [];
      const numImagesToDisplay = 4;
      const filteredImages = allFiles.filter(
        (file) => file.watermarkedCid !== ""
      );

      for (let i = 0; i < numImagesToDisplay; i++) {
        const randomIndex = Math.floor(Math.random() * filteredImages.length);
        randomImagesMain.push(filteredImages[randomIndex]);
      }

      setSelectedImagesMain(randomImagesMain);
    };

    getRandomImages();

    const interval = setInterval(() => {
      getRandomImages();
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, [allFiles]);

  const updateFavorite = (cardId: any) => {
    let updatedFavorite = [...favorite];
    if (!updatedFavorite.includes(cardId)) {
      updatedFavorite = [...favorite, cardId];
    } else {
      updatedFavorite = updatedFavorite.filter(
        (favoriteItem) => cardId !== favoriteItem
      );
    }
    setFavorite(updatedFavorite);
  };

  return (
    <div className="pt-[60px] pb-[100px]">
      <div className="flex flex-col justify-center items-center">
        <div className="md:-ml-[360px] md:mr-[0px] mr-[60px]">
          <span className="text-greyText">Popular</span>: Rain, Nature, Moutains
        </div>
        <div className="mt-[90px] text-center">
          <div className="text-4xl font-extrabold mb-5">Featured Images</div>
          <div className="text-md text-greyText max-w-[580px]">
            Lorem ipsum doarl sit delaka it timarnadrer er aslwe csderd vcd
            Lorem ipsum doarl sit delaka it timarnadrer er as
          </div>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-6 w-fit mx-auto mt-20 min-h-[460px]">
        {selectedImagesMain &&
          selectedImagesMain.map((card: any, i: any) => {
            return (
              <div key={i}>
                <ImageCard
                  cid={card.watermarkedCid}
                  title={card.title}
                  onClick={() => updateFavorite(card.tokenId)}
                  id={card.tokenId}
                  favorite={favorite}
                  addToCartButton={true}
                  buyNowButton={true}
                  price={card.price}
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-center my-20">
        <Link href={"/explore"}>
          {" "}
          <GenericButton
            label="View all"
            variant="mainFull"
            size="md"
            onclick={() => null}
          />
        </Link>
      </div>
    </div>
  );
};

export default Main;
