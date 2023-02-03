import { useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";

const Collection = () => {
  const [myImage, setMyImage] = useState(myCardSale);
  return (
    <div className="flex flex-wrap">
      {myCardSale.map((card, i) => (
        <ImageCardForSale
          key={i}
          img={card.img}
          title={card.title}
          description={card.description}
          price={card.price}
        />
      ))}
    </div>
  );
};

export default Collection;
