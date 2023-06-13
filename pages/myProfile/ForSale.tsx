// import { FC, useEffect, useState } from "react";
// import ImageCardForSale from "../../components/ImageCardForSale";

// import { ethers } from "ethers";

// interface ForSaleProps {
//   cids: string;
//   price: number;
// }
// const ForSale: FC<ForSaleProps> = ({ cids, price }) => {
//   const [imagesForSale, setImagesForSale] = useState("");
//   const priceInEther = price ? ethers.utils.formatEther(price.toString()) : "0";

//   useEffect(() => {
//     async function fetchImageData() {
//       try {
//         const response = await fetch(`https://ipfs.io/ipfs/${cids}`);
//         const data = await response.text();
//         setImagesForSale(data);
//       } catch (error) {
//         console.log("Error fetching image data", error);
//       }
//     }
//     fetchImageData();
//   }, [cids, price]);
//   //console.log("cids", cids); //works fine
//   return (
//     <div>
//       <div className="mb-6">
//         {imagesForSale && (
//           <ImageCardForSale
//             img={imagesForSale}
//             title={""}
//             description={""}
//             price={priceInEther}
//             downloadButton={true}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForSale;
import { FC, useEffect, useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { ethers, utils } from "ethers";

interface ForSaleProps {
  cids: string;
  price: number;
}

const ForSale: FC<ForSaleProps> = ({ cids, price }) => {
  const [imagesForSale, setImagesForSale] = useState("");

  useEffect(() => {
    async function fetchImageData() {
      try {
        if (cids) {
          const response = await fetch(`https://ipfs.io/ipfs/${cids}`);
          const data = await response.text();
          setImagesForSale(data);
        }
      } catch (error) {
        console.log("Error fetching image data", error);
      }
    }
    fetchImageData();
  }, [cids, price]);

  return (
    <div>
      <div className="mb-6">
        {imagesForSale && (
          <ImageCardForSale
            img={imagesForSale}
            title={""}
            description={""}
            price={utils.formatEther(price)}
            downloadButton={true}
          />
        )}
      </div>
    </div>
  );
};

export default ForSale;
