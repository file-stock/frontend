import { useState, useEffect } from "react";
import ProfileUserPicture from "../../components/ProfileUserPicture";
import Collection from "./Collection";
import ForSale from "./ForSale";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";
const MyProfile = () => {
  const { allFiles, wallet, isConnected, contractRights, userAddress } =
    useContext(ThemeContext);
  const [currenView, setCurrentView] = useState<"collection" | "forsale">(
    "collection"
  );
  const [myImages, setMyImages] = useState<any>([]);
  const [filterBy, setFilterBy] = useState<
    "higherPrice" | "lowerPrice" | "newer" | "older" | ""
  >("");
  const [sortedImages, setSortedImages] = useState(myImages);
  const [nftData, setNftData] = useState<any[]>([]);
  const id = nftData.map((data) => data.tokenId.toString());
  const [nftBalances, setNftBalances] = useState<any[]>([]);

  async function getBalances() {
    const balances = await Promise.all(
      id.map(async (ids) => {
        try {
          const balance = await contractRights.balanceOf(userAddress, ids);
          return { tokenId: ids, balance };
        } catch (error) {
          console.error("Errore durante la chiamata a balanceOf:", error);
          return { tokenId: ids, balance: 0 };
        }
      })
    );
    setNftBalances(balances);
  }

  useEffect(() => {
    getBalances();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftData])
  useEffect(() => {
    const fetchRightsNFTData = async () => {
        try {
            const data = [];
            const count = await contractRights.rightsNFTCount();
            for (let i = 1; i <= count; i++) {
                const nftData = await contractRights.rightsNFT(i);
                const balance = await contractRights.balanceOf(userAddress, nftData.tokenId.toString());
                if (balance > 0) {
                    data.push(nftData);
                }
            }
            setNftData(data);
        } catch (error) {
            console.error("Error fetching NFT data: ", error);
        }
    };
    if (contractRights) {
        fetchRightsNFTData();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [contractRights]);

  let walletAddress = "";
  if (isConnected && wallet && wallet.accounts && wallet.accounts[0]) {
    walletAddress = wallet.accounts[0].address;
  }

  useEffect(() => {
    if (walletAddress) {
      const imagesCreatedByUser = allFiles.filter(
        (file) => file.creator.toLowerCase() === walletAddress.toLowerCase()
      );
      setMyImages(imagesCreatedByUser);
    }
  }, [allFiles, walletAddress]);
  //console.log("myimages in my profile", myImages[0].price);
  const sortImages = (images: any, filter: any) => {
    switch (filter) {
      case "higherPrice":
        return [...images].sort((a, b) => b.price - a.price);
      case "lowerPrice":
        return [...images].sort((a, b) => a.price - b.price);
      default:
        return images;
    }
  };
  useEffect(() => {
    setSortedImages(sortImages(myImages, filterBy));
  }, [filterBy, myImages]);

  return (
    <div className="px-[140px] pb-[150px] flex justify-between">
       {nftData.map((data, index) => {
        const balanceData = nftBalances.find(b => b.tokenId === data.tokenId.toString());
        const balance = balanceData ? balanceData.balance : 0;
        return (
          <div key={index} className="">
            <ImageCard cid={data.cid} id={data.tokenId} />
            <p>Creator: {data.creator}</p>
            <p>Token ID: {data.tokenId.toString()}</p>
            <p>Quantity: {balance.toString()}</p>
          </div>
        );
      })}
      {/* <div className="mt-[75px]">
        <ProfileUserPicture />
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between w-1/5 mt-[75px] mb-[45px]">
          <div
            onClick={() => setCurrentView("collection")}
            className={`py-1.5 px-5 rounded-full text-greyText text-md cursor-pointer ${
              currenView === "collection" &&
              "bg-main text-white font-bold sm:pt-5"
            }`}
          >
            Collection
          </div>
          <div
            onClick={() => setCurrentView("forsale")}
            className={`py-1.5 px-5 rounded-full text-greyText text-lg cursor-pointer ${
              currenView === "forsale" &&
              "bg-main text-white font-bold sm:px-10 sm:text-lg sm:leading-5"
            }`}
          >
            For sale
          </div>
        </div>
        <div className="flex items-center justify-start mb-10 bg-main text-white font-bold text-[20px] rounded-lg py-3 px-10 mt-[75px] mb-[45px] cursor-pointer">
          <div className="mr-4">Filter by:</div>
          <div>
            <select
              className="bg-main text-white outline-none"
              value={filterBy}
              onChange={(e) =>
                setFilterBy(
                  e.target.value as
                    | "higherPrice"
                    | "lowerPrice"
                    | "newer"
                    | "older"
                )
              }
            >
              <option value="higherPrice">Higher Price</option>
              <option value="lowerPrice">Lower Price</option>
              <option value="newer">Newer</option>
              <option value="older">Older</option>
            </select>
          </div>
        </div>
      </div>
      {currenView === "collection" ? (
        <Collection />
      ) : (
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mt-20">
            {isConnected &&
              sortedImages
                // .slice()
                // .sort((a: any, b: any) => (b.price.gt(a.price) ? 1 : -1))
                .map((file: any, index: any) => (
                  <div key={index}>
                    <ForSale
                      key={index}
                      cids={file.watermarkedCid}
                      price={file.price}
                    />
                  </div>
                ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MyProfile;
