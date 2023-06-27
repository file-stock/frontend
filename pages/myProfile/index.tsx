import { useState, useEffect } from "react";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Collection from "./Collection";
import ForSale from "./ForSale";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
import FiltersDropdown from "../explore/filters";
import { utils } from "ethers";
import priceFilters from "../../components/filters_data";
import { useRouter } from "next/router";

const filterOptions = [{ label: "Price ranges", options: priceFilters }];

const MyProfile = () => {
  const { allFiles, wallet, isConnected, contractRights, userAddress } =
    useContext(ThemeContext);
  const [currentView, setCurrentView] = useState<"collection" | "forsale">(
    "forsale"
  );
  const [myImages, setMyImages] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    "Price ranges": "All",
  });
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [sortedImages, setSortedImages] = useState<any[]>([]);
  const router = useRouter();

  let walletAddress = "";
  if (isConnected && wallet && wallet.accounts && wallet.accounts[0]) {
    walletAddress = wallet.accounts[0].address;
  }

  useEffect(() => {
    if (walletAddress) {
      const imagesCreatedByUser = allFiles.filter(
        (file) => file.creator.toLowerCase() === walletAddress.toLowerCase()
      );
      setMyImages(imagesCreatedByUser);
    }
  }, [allFiles, walletAddress]);

  useEffect(() => {
    const filtered = myImages.filter(filterImagesByPrice);
    setFilteredImages(filtered);
    setSortedImages(sortImages(filtered, selectedFilters["Price ranges"]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myImages, selectedFilters]);

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

  const handleFilterChange = (label: string, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [label]: value,
    });
  };

  const sortImages = (images: any[], filter: string) => {
    switch (filter) {
      case "higherPrice":
        return [...images].sort((a, b) => b.price - a.price);
      case "lowerPrice":
        return [...images].sort((a, b) => a.price - b.price);
      default:
        return images;
    }
  };

  useEffect(() => {
    router.push("/myProfile");
  }, []);

  return (
    <div className="pb-[50px] pl-3">
      <div className="mt-[75px]">
        <ProfileUserPicture />
      </div>
      <div className="sm:flex sm:justify-between md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between 2xl:flex 2xl:justify-between">
        <div className="flex justify-between w-1/5 mt-[75px] mb-[45px]">
          <div
            onClick={() => setCurrentView("collection")}
            className={`py-1.5 px-5 rounded-full text-greyText text-md cursor-pointer ${
              currentView === "collection" &&
              "bg-main text-[#FFFFFF] font-bold sm:px-5 sm:py-2 md:px-5 md:py-2 lg:px-5 2xl:px-10 2xl:py-5 2xl:h-15 px-5 py-2"
            }`}
          >
            Collection
          </div>
          <div
            onClick={() => setCurrentView("forsale")}
            className={`py-1.5 px-5 rounded-full text-greyText text-lg cursor-pointer whitespace-nowrap ${
              currentView === "forsale" &&
              "bg-main text-[#FFFFFF] font-bold sm:px-5 sm:py-2 md:px-5 md:py-2 lg:px-5 2xl:px-10 2xl:py-5 2xl:h-15 px-5 py-2"
            }`}
          >
            For sale
          </div>
        </div>
        {filterOptions.map(({ label, options }) => (
          <div
            key={label}
            className="mt-12 lg:mt-8 mb-20 mr-10 sm:ml-0 flex flex-col items-center lg:items-start"
          >
            <h3 className="text-lg font-semibold">{label}</h3>
            <FiltersDropdown
              options={options}
              defaultOption="All"
              onChange={(value) => handleFilterChange(label, value)}
            />
          </div>
        ))}
      </div>
      {currentView === "collection" ? (
        <Collection />
      ) : (
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mt-20">
            {isConnected &&
              sortedImages.map(
                (file: any, index: any) => (
                  console.log(file.tokenId.toString()),
                  (
                    <div key={index}>
                      <ForSale
                        key={index}
                        cids={file.watermarkedCid}
                        price={file.price}
                        id={file.tokenId.toString()}
                      />
                    </div>
                  )
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
