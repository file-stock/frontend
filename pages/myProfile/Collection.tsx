import { ThemeContext } from "../../context/context";
import { useState, useContext, useEffect } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";
import { ethers } from "ethers";

const Collection = () => {
  const [myImage, setMyImage] = useState(myCardSale);
  const { isConnected, provider, contractRights } = useContext(ThemeContext); // assuming provider is passed in context

  return (
    <div className="flex flex-wrap gap-14 sm:mt-20">
      {isConnected &&
        myCardSale.map((card, i) => (
          <ImageCardForSale
            key={i}
            img={card.img}
            title={card.title}
            description={card.description}
            price={card.price}
            downloadButton={true}
          />
        ))}
    </div>
  );
};

export default Collection;
