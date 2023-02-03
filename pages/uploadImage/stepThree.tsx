import { FC, useEffect, useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";

type StepThreeProps = {
  img: any;
  title: string;
  description: string;
  price: any;
};

const StepThree: FC<StepThreeProps> = ({ img, title, description, price }) => {
  const [myImagesCard, setMyImagesCard] = useState<any[]>(myCardSale);

  console.log("ste three");

  useEffect(() => {
    console.log("inside effect");

    setMyImagesCard((prev) => [
      ...prev,
      { img: img, title: title, description: description, price: price },
    ]);
  }, [description, img, price, title]);

  return (
    <div className="pb-[128px]">
      <div className="text-3xl font-extrabold mb-20">My images for sale:</div>
      <div className="flex flex-wrap gap-10">
        {myImagesCard.map((card: any, i: any) => {
          return (
            <div key={i} className="flex gap-5">
              <ImageCardForSale
                img={card.img}
                title={card.title}
                description={card.description}
                price={card.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepThree;
