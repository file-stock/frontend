import { useContext } from "react";
import { ThemeContext } from "../context/context";
type connecttype = {
  className?: string;
};
const ConnectWallet = ({ className }: connecttype) => {
  const {
    connect,
    disconnect,
    wallet,
    connecting,
    setIsConnected,
    isConnected,
  } = useContext(ThemeContext);
  return (
    <>
      <button
        onClick={() => {
          if (wallet) {
            disconnect(wallet);
            if (setIsConnected) {
              setIsConnected(false);
            }
          } else {
            connect().then(() => {
              if (setIsConnected) {
                setIsConnected(true);
              }
            });
          }
        }}
        className={`${className} text-white border border-main bg-main rounded-lg py-2 px-4 font-bold cursor-pointer sm:p-2 sm:text-xs`}
      >
        {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect Wallet"}
      </button>
    </>
  );
};

export default ConnectWallet;
