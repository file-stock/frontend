import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/context";
import FilterDropdown from "./filters";
import // colorFilters,
// sizeFilters,
// licenseFilters,
// orientationFilters,
priceFilters from "../../components/filters_data";
import ImageCard from "../../components/ImageCard";
import { exploreImages as cards } from "../../constants/constants";
import { tags } from "../../public/tags";
import TagSearch from "../../components/TagSearch";
import { useRouter } from "next/router";
import { utils } from "ethers";

const filterOptions = [{ label: "Price ranges", options: priceFilters }];

const Explore = () => {
  const router = useRouter();
 
  const { allFiles, selectedTags, setSelectedTags, selectedTagNumbers, setSelectedTagNumbers } = useContext(ThemeContext);
  const [selectedFilters, setSelectedFilters] = useState({ "Price ranges": "All" });
  const [favorite, setFavorite] = useState<any[]>([]);


  
  useEffect(() => {
    const passedSearchTerm = router.query.search as string || undefined;
    if (passedSearchTerm) {
      setSelectedTags([passedSearchTerm]);
    } else {
      setSelectedTags([]);
    }
    const selectedTagNumber = Object.entries(tags).find(
      ([key, value]) => value === passedSearchTerm
    )?.[0];
    if (selectedTagNumber) {
      setSelectedTagNumbers([parseInt(selectedTagNumber)]);
    }
 
  }, [router.query, setSelectedTagNumbers, setSelectedTags]);

  useEffect(() => {
    return () => {
      setSelectedTags([]);
      setSelectedTagNumbers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
   
  const filterImagesByPrice = (file: any) => {
    const selectedPrice = selectedFilters["Price ranges"];
  
    if (!selectedPrice || selectedPrice === "All") return true;
  
    const etherValue = parseInt(utils.formatEther(file.price.toString()), 10);
  
    if (selectedPrice === "1") {
      return etherValue >= 1 && etherValue <= 10;
    } else if (selectedPrice === "10") {
      return etherValue >= 11 && etherValue <= 50;
    } else if (selectedPrice === "50") {
      return etherValue >= 51;
    }
  
    return false;
  };
  

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
    return selectedTagNumbers.every((tagNumber) =>
      fileTags.includes(tagNumber)
    );
  };

  return (
    <div>
      <div className="relative flex justify-between gap-6 w-[87%] mx-auto">
        <TagSearch
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedTagNumbers={selectedTagNumbers}
          setSelectedTagNumbers={setSelectedTagNumbers}
          btn={false}
          size="lg"
        />
        {filterOptions.map(({ label, options }) => (
          <div key={label} className="my-auto">
            <h3 className="text-lg font-semibold">{label}</h3>
            <FilterDropdown
              options={options}
              defaultOption={"All"}
              onChange={(value) => handleFilterChange(label, value)}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-10 mt-6 w-[87%] mx-auto mt-20">
        {allFiles 
          .filter((file: any) => file.fileTags && file.fileTags.length > 0)
          .filter(filterImagesByTags)
          .filter(filterImagesByPrice)
          .map((file: any, index: any) => {
            return (
              <div key={index} className="shadow-2xl rounded-xl">
                <ImageCard
                  cid={file[0]}
                  onClick={() => updateFavorite(file.fileTags)}
                  id={file.tokenId}
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
