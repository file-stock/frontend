import React from "react";
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
import { myCardSale } from "../constants/constants";

type ContextType = {
  isConnected: boolean;
  connect: any;
  wallet: any;
  disconnect: any;
  connecting: any;
  callContract: (hash: any) => Promise<void>;
  callBuyFile: () => Promise<void>;
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

  const CONTRACT_ADDRESS = "0x307c87ff1e333ad5cc193e2fe0a13c3d27fa2d60";

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

    setContract(contract);
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
      console.log("fetchedFiles", allFiles);
    };
    fetchFiles();
  }, [CONTRACT_ADDRESS, rpcUrl]);

  const callContract = async (hash: any) => {
    if (!contract || !price) return;
    const tx = await contract.storeFile(
      hash,
      ethers.utils.parseEther(price.toString()),
      []
    );
    await tx.wait();
    console.log("after transaction");
    contract.on("StoreFile", (value1: any, value2: any, value3: any) => {
      console.log(value1);
      console.log(value2);
      console.log(value3);
    });
  };

  const callBuyFile = async () => {
    console.log("callBuyFile");
    const amount = ethers.utils.parseEther("0.2");
    console.log(amount.toString());
    const tx = await contract.buyFile(1, { gasLimit: 200000, value: amount });
    await tx.wait();
    console.log(tx);
  };

  return (
    <ThemeContext.Provider
      value={{
        isConnected,
        connect,
        disconnect,
        wallet,
        connecting,
        callContract,
        callBuyFile,
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
