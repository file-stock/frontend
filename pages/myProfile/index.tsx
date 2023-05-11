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
  return (
    <div className="px-[140px] pb-[150px]">
      <div className="mt-[75px]">
        <ProfileUserPicture />
      </div>
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
      {currenView === "collection" ? (
        <Collection />
      ) : (
        myImages.map((file: any, index: any) => (
          <ForSale key={index} cids={file.watermarkedCid} />
        ))
      )}
    </div>
  );
};

export default MyProfile;
