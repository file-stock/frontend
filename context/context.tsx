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
import creatorAbi from "../lib/creatorAbi.json";
import lighthouse from "@lighthouse-web3/sdk";

declare global {
  interface Window {
    ethereum: any;
  }
}

export type CartItemType = {
  imageId: number;
  cid: string;
  price: number;
  quantity: number;
  selected: boolean;
};

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
  isErrorPopupVisible: boolean;
  setIsErrorPopupVisible: Dispatch<SetStateAction<boolean>>;
  popupMessage: string;
  setPopupMessage: Dispatch<SetStateAction<string>>;
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
  ContractAbi: any;
  cart: any[];
  setCart: Dispatch<SetStateAction<any[]>>;
  savedForLater: any[];
  setSavedForLater: Dispatch<SetStateAction<any[]>>;
};

const rpcUrl = "https://api.calibration.node.glif.io/rpc/v1";
const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0xc45", //correspond to 3141
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
  const [imgForSale, setImgForSale] = useState<any[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const [readOnly, setReadOnly] = useState<any>();
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTagNumbers, setSelectedTagNumbers] = useState<number[]>([]);
  const [contractRights, setContractRights] = useState<any>();
  const [contractCreator, setContractCreator] = useState<any>();
  const [cart, setCart] = useState<any[]>([]);
  const [savedForLater, setSavedForLater] = useState<any[]>([]);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const CONTRACT_ADDRESS = "0x307C87ff1E333ad5CC193e2Fe0A13c3d27FA2d60";
  const CONTRACT_RIGHTS = "0x4B10f9699B33686aBc694D35E09f698cD02688b2";
  const CONTRACT_CREATOR = "0x52480B3fA8B136B86D824BD31DC9512909528E86";
  useEffect(() => {
    const hProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    setHyperProvider(hProvider);
  }, []);

  const changeChain = async () => {
    const { ethereum } = window as any;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4cb2f" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "314",
                rpcUrls: ["https://rpc.ankr.com/filecoin"],
                chainName: "Filecoin - Mainnet",
                nativeCurrency: {
                  name: "FIL",
                  symbol: "FIL",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://filfox.info/en"],
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }
  };

  useEffect(() => {
    const savedCart = window.localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      window.localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    const savedForLater = window.localStorage.getItem("savedForLater");
    if (savedForLater) {
      setSavedForLater(JSON.parse(savedForLater));
    }
  }, []);

  useEffect(() => {
    if (savedForLater.length > 0) {
      window.localStorage.setItem(
        "savedForLater",
        JSON.stringify(savedForLater)
      );
    } else {
      window.localStorage.removeItem("savedForLater");
    }
  }, [savedForLater]);

  useEffect(() => {
    const walletData = window.localStorage.getItem("ConnectedWallets");
    if (walletData) {
      const pastConnectedWallet = JSON.parse(walletData);
      if (pastConnectedWallet)
        connect({
          autoSelect: { label: pastConnectedWallet, disableModals: true },
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wallet) {
      const { label } = wallet;
      window.localStorage.setItem("ConnectedWallets", JSON.stringify(label));
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      changeChain();
      setProvider(ethersProvider);
      setUserAddress(wallet.accounts[0].address);
      setIsConnected(true);
    } else {
      setIsConnected(false);
      setUserAddress("");
      setProvider(null);
      window.localStorage.removeItem("ConnectedWallets");
    }
  }, [wallet, connect]);

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
    setContractCreator(contractCreator);
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
        popupMessage,
        setPopupMessage,
        isErrorPopupVisible,
        setIsErrorPopupVisible,
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
        cart,
        setCart,
        savedForLater,
        setSavedForLater,
        ContractAbi,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
