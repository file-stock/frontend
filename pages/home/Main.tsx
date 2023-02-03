import { useState } from "react";
import GenericButton from "../../components/GenericButton";

import ImageCard from "../../components/ImageCard";
import { homePageImages } from "../../constants/constants";

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
    <div className="pt-[60px] pb-[100px] px-[140px]">
      <div className="flex flex-col justify-center items-center">
        <div className="-ml-[480px]">
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
                description={card.description}
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
        <GenericButton
          label="View all"
          variant="mainFull"
          size="sm"
          onclick={() => null}
        />
      </div>
    </div>
  );
};

export default Main;
