import { useState } from "react";
import FilterDropdown from "./filters";
import {
  colorFilters,
  sizeFilters,
  licenseFilters,
  orientationFilters,
  priceFilters,
} from "./filters_data";
import ImageCard from "../../components/ImageCard";
import { exploreImages as cards } from "../../constants/constants";

const filterOptions = [
  { label: "Colors", options: colorFilters },
  { label: "Sizes", options: sizeFilters },
  { label: "License type", options: licenseFilters },
  { label: "Orientations", options: orientationFilters },
  { label: "Price ranges", options: priceFilters },
];

const Explore = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [favorite, setFavorite] = useState<any[]>([]);

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

  const handleFilterChange = (label: string, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [label]: value,
    });
  };

  return (
    <div>
      <div className="w-[87%] mx-auto">
        <h1 className="text-4xl font-bold">Jungle images</h1>
      </div>
      <div className="h-16 w-[87%] mx-auto"> TAGS div</div> 
      <div className="flex justify-between gap-6 w-[87%] mx-auto">
        {filterOptions.map(({ label, options }) => (
          <div key={label} className="my-4">
            <h3 className="text-lg font-semibold">{label}</h3>
            <FilterDropdown
              options={options}
              defaultOption={"All"}
              onChange={(value) => handleFilterChange(label, value)}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 mt-6 w-[87%] mx-auto">
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
                className="opacity-0 hover:opacity-100 h-full relative"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Explore;
