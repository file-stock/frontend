import React, { use } from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import ContractAbi from "../lib/contractAbi.json";
import nftRightsAbi from "../lib/nftRightsAbi.json";
import { myCardSale } from "../constants/constants";
import creatorAbi from "../lib/creatorAbi.json"
import lighthouse from "@lighthouse-web3/sdk";

declare global {
  interface Window {
    ethereum: any;
  }
}

type ContextType = {
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  selectedTagNumbers: number[];
  setSelectedTagNumbers: Dispatch<SetStateAction<number[]>>;
  isConnected: boolean;
  connect: any;
  wallet: any;
  disconnect: any;
  connecting: any;

  setHash: Dispatch<SetStateAction<string>>;
  setIsConnected?: Dispatch<SetStateAction<boolean>>;
  setImgForSale: Dispatch<SetStateAction<any>>;
  setPrice: any;
  price: any;
  imgForSale: any;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  randomImages: any[];
  setRandomImages: Dispatch<SetStateAction<any[]>>;
  readOnly: any;
  setReadOnly: Dispatch<SetStateAction<any>>;
  allFiles: any[];
  contract: any;
  userAddress: string;
  provider: any;
  contractRights: any;
  contractCreator: any;
};

const rpcUrl = "https://api.hyperspace.node.glif.io/rpc/v1";
const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0xC49", //correspond to 3141
      token: "tFIL",
      label: "Filecoin Hyperspace",
      rpcUrl,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export const ThemeContext = createContext<ContextType>({} as ContextType);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [hyperProvider, setHyperProvider] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState<any>();
  const [hash, setHash] = useState<string>("");
  const [price, setPrice] = useState<any>();
  const [imgForSale, setImgForSale] = useState<any[]>(myCardSale);
  const [preview, setPreview] = useState<string>("");
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const [readOnly, setReadOnly] = useState<any>();
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagNumbers, setSelectedTagNumbers] = useState<number[]>([]);
  const [contractRights, setContractRights] = useState<any>();
  const [contractCreator, setContractCreator] = useState<any>()

  const CONTRACT_ADDRESS = "0xDFeeE88440d7e7Bd773611fa5949c8318dfbaFa4";
  const CONTRACT_RIGHTS = "0x9aA74DfF5e1A74e6b1c3e7A500ed581E74247461";
  const CONTRACT_CREATOR = "0x15814D0519D1EFcdC600C9a18fD9705c1A38be57";
  useEffect(() => {
    const hProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    setHyperProvider(hProvider);
  }, []);

  useEffect(() => {
    if (wallet) {
      const { label, provider, accounts } = wallet;
      window.localStorage.setItem("connectedWallets", JSON.stringify(label));
      setProvider(new ethers.providers.Web3Provider(provider, "any"));
      setUserAddress(accounts[0].address);
      setIsConnected(true);
    } else {
      // wallet is null or undefined, user is likely disconnected
      setIsConnected(false);
      setUserAddress("");
      setProvider(null);
      window.localStorage.removeItem("connectedWallets");
    }
  }, [wallet]);

  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner());
    }
  }, [provider]);

  useEffect(() => {
    if (!signer) return;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractAbi, signer);
    const contractRights = new ethers.Contract(
      CONTRACT_RIGHTS,
      nftRightsAbi,
      signer
    );
    const contractCreator = new ethers.Contract(
      CONTRACT_CREATOR,
      creatorAbi,
      signer
    );
    setContractCreator(contractCreator)
    setContract(contract);
    setContractRights(contractRights);
  }, [signer]);

  useEffect(() => {
    const fetchFiles = async () => {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const fileStockContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractAbi,
        provider
      );
      try {
        const fetchedFiles = await fileStockContract.getAllFiles();
        setAllFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };
    fetchFiles();
    console.log("fetchedFiles", allFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CONTRACT_ADDRESS, rpcUrl]);



  return (
    <ThemeContext.Provider
      value={{
        contractCreator,
        contract,
        userAddress,
        isConnected,
        connect,
        disconnect,
        wallet,
        connecting,
    
        setHash,
        setPrice,
        price,
        setIsConnected,
        imgForSale,
        setImgForSale,
        preview,
        setPreview,
        randomImages,
        setRandomImages,
        readOnly,
        setReadOnly,
        allFiles,
        selectedTags,
        setSelectedTags,
        selectedTagNumbers,
        setSelectedTagNumbers,
        provider,
        contractRights: contractRights,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
