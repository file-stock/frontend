import { FC, useEffect, useState, useContext } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { ThemeContext } from "../../context/context";

import { ethers } from "ethers";

interface ForSaleProps {
  cids: string;
  price: number;
}
const ForSale: FC<ForSaleProps> = ({ cids, price }) => {
  const { allFiles } = useContext(ThemeContext);
  const [imagesForSale, setImagesForSale] = useState("");
  const priceInEther = ethers.utils.formatEther(price);

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
  }, [cids, price]);

  return (
    <div className="mb-6">
      {imagesForSale === ""
        ? "No images for sale at the moment"
        : imagesForSale && (
            <ImageCardForSale
              img={imagesForSale}
              title={""}
              description={""}
              price={priceInEther}
              downloadButton={true}
            />
          )}
    </div>
  );
};

export default ForSale;
