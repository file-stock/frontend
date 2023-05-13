import { FC, useEffect, useState, useContext } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";

import { ethers } from "ethers";

interface ForSaleProps {
  cids: string;
  price: number;
}
const ForSale: FC<ForSaleProps> = ({ cids, price }) => {
  const [imagesForSale, setImagesForSale] = useState("");
  const priceInEther = price ? ethers.utils.formatEther(price.toString()) : "0";

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
      {imagesForSale && (
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
