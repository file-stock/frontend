import { ThemeContext } from "../../context/context";
import { useState, useContext } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";

const Collection = () => {
  const [myImage, setMyImage] = useState(myCardSale);
  const { isConnected } = useContext(ThemeContext);
  return (
    <div className="flex flex-wrap gap-14">
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
