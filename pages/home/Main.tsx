import { useState } from "react";
import GenericButton from "../../components/GenericButton";
import Link from "next/link";
import ImageCard from "../../components/ImageCard";
import { homePageImages } from "../../constants/constants";
import React from "react";

const Main = () => {
  const [favorite, setFavorite] = useState<any[]>([]);
  const cards = homePageImages;

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
        <div className="-ml-[360px]">
          <span className="text-greyText">Popular</span>: Rain, Nature, Moutains
        </div>
        <div className="mt-[90px] text-center">
          <div className="text-4xl font-extrabold mb-5">Featured Images</div>
          <div className="text-md text-greyText w-[580px]">
            Lorem ipsum doarl sit delaka it timarnadrer er aslwe csderd vcd
            Lorem ipsum doarl sit delaka it timarnadrer er as
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-20">
        {cards.map((card: any, i: any) => {
          return (
            <div key={i}>
              <ImageCard
                img={card.img}
                title={card.title}
                onClick={() => updateFavorite(card.id)}
                id={i}
                favorite={favorite}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-20">
        <Link href={"/explore"}> <GenericButton
          label="View all"
          variant="mainFull"
          size="md"
          onclick={() => null}
        /></Link>
       
      </div>
    </div>
  );
};

export default Main;
