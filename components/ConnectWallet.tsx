import { useContext } from "react";
import { ThemeContext } from "../context/context";
type connecttype = {
  className?: string;
}
const ConnectWallet = ({className}:connecttype) => {
  const { connect, disconnect, wallet, connecting } = useContext(ThemeContext);
  return (
    <>
      <button
        onClick={() => (wallet ? disconnect(wallet) : connect())}
        className={`${className} text-white border border-main bg-main rounded-lg py-2 px-4 font-bold cursor-pointer `}
      >
        {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect Wallet"}
      </button>
    </>
  );
};

export default ConnectWallet;
