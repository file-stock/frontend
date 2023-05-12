import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/context";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
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
  const [isLoading, setIsLoading] = useState(true);
  const {
    allFiles,
    selectedTags,
    setSelectedTags,
    selectedTagNumbers,
    setSelectedTagNumbers,
  } = useContext(ThemeContext);
  const [selectedFilters, setSelectedFilters] = useState({
    "Price ranges": "All",
  });
  const [favorite, setFavorite] = useState<any[]>([]);
  const [visibleImages, setVisibleImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);

  useEffect(() => {
    const filtered = allFiles
      .filter((file: any) => file.fileTags && file.fileTags.length > 0)
      .filter(filterImagesByTags)
      .filter(filterImagesByPrice);
    setFilteredImages(filtered);
    setVisibleImages(filtered.slice(0, 16));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFiles, selectedTagNumbers, selectedFilters]);
  

  useEffect(() => {
    // controllo dell'url al refresh
    const unmountFlag = window.localStorage.getItem("unmountFlag");
    if (!unmountFlag) {
      router.push("/explore");
    } else {
      window.localStorage.removeItem("unmountFlag");
    }
    return () => {
      window.localStorage.setItem("unmountFlag", "true");
    };
  }, [router]);

  const loadMoreImages = () => {
    setVisibleImages((prevImages) =>
      prevImages.concat(
        filteredImages.slice(prevImages.length, prevImages.length + 16)
      )
    );
  };

  useInfiniteScroll(loadMoreImages);

  useEffect(() => {
    const passedSearchTerm = (router.query.search as string) || undefined;
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

    if (selectedPrice === "0") {
      return etherValue >= 0 && etherValue <= 10;
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
      <div className="grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 mt-6 w-fit mx-auto mt-20 min-h-[460px]">
        {isLoading ? (
          <p className="text-lg text-center">Loading...</p>
        ) : visibleImages.length > 0 ? (
          visibleImages.map((file: any, index: any) => {
            return (
              <div key={index} className="shadow-2xl rounded-xl">
                <ImageCard
                  cid={file[0]}
                  onClick={() => updateFavorite(file.tokenId)}
                  id={file.tokenId}
                  favorite={favorite}
                />
              </div>
            );
          })
        ) : (
          <div className="">
            <p className="text-lg text-center">
              There are no images with these tags.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Explore;
