import { useState } from "react";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Collection from "./Collection";
import ForSale from "./ForSale";

const MyProfile = () => {
  const [currenView, setCurrentView] = useState<"collection" | "forsale">(
    "collection"
  );
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
      {currenView === "collection" ? <Collection /> : <ForSale />}
    </div>
  );
};

export default MyProfile;
