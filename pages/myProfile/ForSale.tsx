import { useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";

const ForSale = () => {
  const [myImage, setMyImage] = useState(myCardSale);
  return (
    <>
      {myCardSale.map((card, i) => (
        <ImageCardForSale
          key={i}
          img={card.img}
          title={card.title}
          description={card.description}
          price={card.price}
        />
      ))}
    </>
  );
};

export default ForSale;
