import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ContractAbi from "../lib/contractAbi.json";

type ContextType = {
  isConnected: boolean;
  connect: any;
  wallet: any;
  disconnect: any;
  connecting: any;
};

const rpcUrl = "https://api.hyperspace.node.glif.io/rpc/v1";
const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0x3141",
      token: "tFIL",
      label: "Filecoin hyperspace",
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

  const CONTRACT_ADDRESS = "0xD6268E0f96dd072D18a263A80c2C51194720E6B5";

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

  return (
    <ThemeContext.Provider
      value={{ isConnected, connect, disconnect, wallet, connecting }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
