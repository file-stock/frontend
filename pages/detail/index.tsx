/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/context";
import { utils } from "ethers";
import GenericButton from "../../components/GenericButton";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { allFiles, callBuyFile } = useContext(ThemeContext);
  const [imageData, setImageData] = useState("");
  const [cid, setCid] = useState(null);
  const [price, setPrice] = useState<any>();

  useEffect(() => {
    if (typeof id === "string") {
      const imageData = allFiles.find(
        (image) => image.tokenId.toNumber() === parseInt(id)
      );
      setImageData(imageData);
      if (imageData) {
        setCid(imageData.watermarkedCid);
        const etherPrice = utils.formatEther(imageData.price);
        setPrice(etherPrice);
      }
    }
  }, [id, allFiles]);

  useEffect(() => {
    async function fetchImageData() {
      try {
        if (cid) {
          const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
          const data = await response.text();
          setImageData(data);
        }
      } catch (error) {
        console.log("Error fetching image data", error);
      }
    }
    fetchImageData();
  }, [cid]);
  console.log("details log", id);
  return (
    <div className="flex justify-center">
      {imageData ? (
        <div>
          <div className="w-[1640px] h-[761px] flex justify-center">
            <img
              src={imageData}
              alt="Selected image"
              className=" w-fit h-full object-contain rounded-xl "
            />
          </div>
          <div className=" flex justify-between py-4">
            <div>
              <div className="font-bold text-[46px] mb-6">Title of the image</div>
              <div className="text-[#6B7280]">Image price</div>
              <p className="text-[46px]">{price} ETH</p>
            </div>
            <div className="">
            <GenericButton
              label="Buy Image"
              variant="mainFull"
              size="md"
              onclick={() => callBuyFile()}
            />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
