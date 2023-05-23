import { useContext } from "react";
import { ThemeContext } from "../context/context";
import { useState } from "react";

const ProfileUserPicture = () => {
  const { userAddress } = useContext(ThemeContext);
  const [showFullAddress, setShowFullAddress] = useState(false);

  const handleAddressClick = () => {
    setShowFullAddress(!showFullAddress);
  };

  const displayAddress = showFullAddress
    ? userAddress
    : userAddress.slice(0, 5) + "...";

  return (
    <>
      <div
        onClick={handleAddressClick}
        className="cursor-pointer sm:flex md:flex lg:flex xl:flex 2xl:flex"
      >
        <div className="font-bold text-lg">User address: </div>
        <span className="sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2 2xlml-2 text-lg">
          {displayAddress}
        </span>
      </div>
    </>
  );
};

export default ProfileUserPicture;
