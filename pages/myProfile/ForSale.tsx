import { FC, useEffect, useState, useContext } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { ThemeContext } from "../../context/context";

interface ForSaleProps {
  cids: string;
}
const ForSale: FC<ForSaleProps> = ({ cids }) => {
  const [imagesForSale, setImagesForSale] = useState("");

  useEffect(() => {
    async function fetchImageData() {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${cids}`);
        const data = await response.text();
        setImagesForSale(data);
      } catch (error) {
        console.log("Error fetching image data", error);
      }
    }
    fetchImageData();
  }, [cids]);
  return (
    <div className="mb-6">
      <div className="">
        {imagesForSale && (
          <ImageCardForSale
            img={imagesForSale}
            title={""}
            description={""}
            price={"2"}
            downloadButton={true}
          />
        )}
      </div>
    </div>
  );
};

export default ForSale;
