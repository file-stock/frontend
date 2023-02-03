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
  setHash: Dispatch<SetStateAction<string>>;
  setIsConnected?: Dispatch<SetStateAction<boolean>>;
  setImgForSale: Dispatch<SetStateAction<any>>;
  setPrice: any;
  price: any;
  imgForSale: any;
};

const rpcUrl = "https://endpoints.omniatech.io/v1/matic/mumbai/public";
const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Polygon Mombai",
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

  const CONTRACT_ADDRESS = "0x39F7F80Fe00b190baF4526C718286eF8aB4EcA21";

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

  const callContract = async (hash: any) => {
    if (!contract || !price) return;
    const tx = await contract.storeFile(
      hash,
      ethers.utils.parseEther(price.toString()),
      []
    );
    await tx.wait();
    contract.on("StoreFile", (value1: any, value2: any, value3: any) => {
      console.log(value1);
      console.log(value2);
      console.log(value3);
    });
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
        setHash,
        setPrice,
        price,
        setIsConnected,
        imgForSale,
        setImgForSale,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
