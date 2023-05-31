import { ThemeContext } from "../../context/context";
import { useState, useContext, useEffect } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import { myCardSale } from "../../constants/constants";
import ImageCard from "../../components/ImageCard";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const Collection = () => {
  const [nftData, setNftData] = useState<any[]>([]);
  const id = nftData.map((data) => data.tokenId.toString());
  const [nftBalances, setNftBalances] = useState<any[]>([]);
  const [fileURL, setFileURL] = useState("");
  const { contractRights, userAddress, allFiles } = useContext(ThemeContext);

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
  }, [nftData]);
  useEffect(() => {
    const fetchRightsNFTData = async () => {
      try {
        const data = [];
        const count = await contractRights.rightsNFTCount();
        for (let i = 1; i <= count; i++) {
          const nftData = await contractRights.rightsNFT(i);
          const balance = await contractRights.balanceOf(
            userAddress,
            nftData.tokenId.toString()
          );
          if (balance > 0) {
            data.push(nftData);
          }
        }
        setNftData(data);
      } catch (error) {
        console.error("Error fetching NFT data: ", error);
      }
    };
    if (contractRights && userAddress) {
      fetchRightsNFTData();
    }

  }, [contractRights, userAddress]);

  const encryptionSignature = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const tokenIds = nftData.map((data) => data.tokenId);
    // const balance = await contractRights.balanceOf(address, tokenIds);

    // if (balance <= 0) {
    //   throw new Error("Utente non autorizzato.");
    // }

    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  
  const decrypted = async (tokenId: string) => {
    const { publicKey, signedMessage } = await encryptionSignature();
    const correspondingFile = allFiles.find(
      (file) => file.tokenId.toString() === tokenId
    );
    const cid = correspondingFile.encryptedCid;
  //  console.log("cid", cid);

    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );
    try {
      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key);
      console.log("decrypted", decrypted);

      const url = URL.createObjectURL(decrypted);
   //   console.log(url);
      setFileURL(url);

      let a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      a.href = url;
      a.setAttribute("download", "image.jpeg");
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Errore durante la decifratura del file:", error);
    }
  };
  return (
    <div className="flex flex-wrap gap-14 sm:mt-20">
      {nftData.map((data, index) => {
        const balanceData = nftBalances.find(
          (b) => b.tokenId === data.tokenId.toString()
        );
        const balance = balanceData ? balanceData.balance : 0;
   //     console.log(data);
        return (
          <div key={index} className="">
            <ImageCard cid={data.cid} id={data.tokenId} />
            <button
              className="text-white bg-main m-5 p-3 rounded-lg ml-1 cursor-pointer"
              onClick={() => decrypted(data.tokenId.toString())}
            >
              Download Image
            </button>
            <div className="sm:flex md:flex lg:flex xl:flex 2xl:flex">
              <p className="font-bold">Creator:</p>
              <span className="sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2 2xl:ml-2">
                {data.creator}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold">Token ID:</p>
              <span className="ml-2">{data.tokenId.toString()}</span>
            </div>
            <div className="flex">
              <p className="font-bold">Quantity: </p>
              <span className="ml-2">{balance.toString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Collection;
