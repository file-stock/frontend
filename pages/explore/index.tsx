import { useState, useContext } from "react";
import { ThemeContext } from "../../context/context";
import FilterDropdown from "./filters";
import 
  // colorFilters,
  // sizeFilters,
  // licenseFilters,
  // orientationFilters,
  priceFilters
 from "./filters_data";
import ImageCard from "../../components/ImageCard";
import { exploreImages as cards } from "../../constants/constants";
import { tags } from "../../public/tags";
import TagSearch from "../../components/TagSearch";

const filterOptions = [
  { label: "Price ranges", options: priceFilters },
];

const Explore = () => {
  const { allFiles } = useContext(ThemeContext);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [favorite, setFavorite] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagNumbers, setSelectedTagNumbers] = useState<number[]>([]);

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

  const filterImagesByTags = (file: any) => {
    if (selectedTagNumbers.length === 0) return true;
    const fileTags = file.fileTags.map((tag: any) => parseInt(tag));
    return selectedTagNumbers.every((tagNumber) => fileTags.includes(tagNumber));
  };

  return (
    <div>
      <div className="w-[87%] mx-auto">
        <h1 className="text-4xl font-bold">Jungle images</h1>
      </div>
      <div className="flex justify-between gap-6 w-[87%] mx-auto">
        <TagSearch
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedTagNumbers={selectedTagNumbers}
          setSelectedTagNumbers={setSelectedTagNumbers}
        />
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
          .filter(filterImagesByTags)
          .map((file: any, index: any) => {
            return (
              <div key={index}>
                <ImageCard
                  cid={file[0]}
                  onClick={() => updateFavorite(file.fileTags)}
                  id={file.fileTags}
                  favorite={favorite}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Explore;
