import { useState, useEffect } from "react";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Collection from "./Collection";
import ForSale from "./ForSale";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";

const MyProfile = () => {
  const { allFiles, wallet, isConnected } = useContext(ThemeContext);
  const [currenView, setCurrentView] = useState<"collection" | "forsale">(
    "collection"
  );
  const [myImages, setMyImages] = useState<any>([]);
  const [filterBy, setFilterBy] = useState<
    "higherPrice" | "lowerPrice" | "newer" | "older" | ""
  >("");
  const [sortedImages, setSortedImages] = useState(myImages);

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
  //console.log("myimages in my profile", myImages[0].price);
  const sortImages = (images: any, filter: any) => {
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
    setSortedImages(sortImages(myImages, filterBy));
  }, [filterBy, myImages]);
  return (
    <div className="px-[140px] pb-[150px]">
      <div className="mt-[75px]">
        <ProfileUserPicture />
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between w-1/5 mt-[75px] mb-[45px]">
          <div
            onClick={() => setCurrentView("collection")}
            className={`py-1.5 px-5 rounded-full text-greyText text-md cursor-pointer ${
              currenView === "collection" && "bg-main text-white font-bold"
            }`}
          >
            Collection
          </div>
          <div
            onClick={() => setCurrentView("forsale")}
            className={`py-1.5 px-5 rounded-full text-greyText text-lg cursor-pointer ${
              currenView === "forsale" && "bg-main text-white font-bold"
            }`}
          >
            For sale
          </div>
        </div>
        <div className="flex items-center justify-start mb-10 bg-main text-white font-bold text-[20px] rounded-lg py-3 px-10 mt-[75px] mb-[45px] cursor-pointer">
          <div className="mr-4">Filter by:</div>
          <div>
            <select
              className="bg-main text-white outline-none"
              value={filterBy}
              onChange={(e) =>
                setFilterBy(
                  e.target.value as
                    | "higherPrice"
                    | "lowerPrice"
                    | "newer"
                    | "older"
                )
              }
            >
              <option value="higherPrice">Higher Price</option>
              <option value="lowerPrice">Lower Price</option>
              <option value="newer">Newer</option>
              <option value="older">Older</option>
            </select>
          </div>
        </div>
      </div>
      {currenView === "collection" ? (
        <Collection />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {isConnected &&
              sortedImages
                // .slice()
                // .sort((a: any, b: any) => (b.price.gt(a.price) ? 1 : -1))
                .map((file: any, index: any) => (
                  <div key={index}>
                    <ForSale
                      key={index}
                      cids={file.watermarkedCid}
                      price={file.price}
                    />
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
