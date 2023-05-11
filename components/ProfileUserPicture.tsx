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
      <div onClick={handleAddressClick} className="cursor-pointer flex">
        <div className="font-bold">User address: </div>
        <span className="ml-2">{displayAddress}</span>
      </div>
    </>
  );
};

export default ProfileUserPicture;
