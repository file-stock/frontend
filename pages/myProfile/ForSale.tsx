import { useContext } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { ThemeContext } from "../../context/context";

const ForSale = () => {
  const { imgForSale } = useContext(ThemeContext);

  console.log("OUT", imgForSale);

  return (
    <div className="flex flex-wrap gap-14">
      {imgForSale.map((card: any, i: any) => (
        <div key={i}>
          <ImageCardForSale
            img={card.img}
            title={card.title}
            description={card.description}
            price={card.price}
            downloadButton={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ForSale;
