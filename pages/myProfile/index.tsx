import { useState } from "react";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Collection from "./Collection";
import ForSale from "./ForSale";

const MyProfile = () => {
  const [currenView, setCurrentView] = useState<"collection" | "forsale">(
    "collection"
  );
  return (
    <>
      <ProfileUserPicture />
      <div className="flex">
        <div>Collection</div>
        <div>For sale</div>
      </div>
      {currenView === "collection" ? <Collection /> : <ForSale />}
    </>
  );
};

export default MyProfile;
