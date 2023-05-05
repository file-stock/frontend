import { useState, useContext } from "react";
import { ThemeContext } from "../../context/context";
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
import { tags } from "../../public/tags";

const filterOptions = [
  { label: "Colors", options: colorFilters },
  { label: "Sizes", options: sizeFilters },
  { label: "License type", options: licenseFilters },
  { label: "Orientations", options: orientationFilters },
  { label: "Price ranges", options: priceFilters },
];

const Explore = () => {
  const { allFiles } = useContext(ThemeContext);
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
      <div className="my-5 w-[87%] mx-auto flex items-center justify-between">
      {allFiles
        .flatMap((file) => file.fileTags.map((tag: any) => tag.toString()))
        .filter((tagId, index, self) => {
          return self.indexOf(tagId) === index;
      })
      .map((tagId) => {
        const foundTagName = tags[tagId];
        return (
          <div key={tagId} className="bg-main text-white rounded-md px-3 py-1 flex justify-between items-center mr-2 mb-2">
            <span className="mr-2">{foundTagName}</span>
            <span
              className="cursor-pointer"
              onClick={() => {}}
            >
            x
            </span>
          </div>
        );
      })}
    </div>
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
        {allFiles
          .filter((file: any) => file.fileTags && file.fileTags.length > 0)
          .map((file: any, index: any) => {
            return (
            <div key={index}>
              <ImageCard
                cid={file[0]}
                onClick={() => updateFavorite(file.fileTags)}
                id={file.fileTags}
                favorite={favorite}
              />
            </div>)
          })}
      </div>
    </div>
  );
};
export default Explore;
