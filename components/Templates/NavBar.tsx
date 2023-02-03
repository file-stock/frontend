import Link from "next/link";
import { useContext, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import InputSerach from "../InputSearch";
import Image from "next/image";

import { logoBlack } from "../../public/index";
import UserDropDownIcon from "../UserDropDownIcon";
import { ThemeContext } from "../../context/context";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(true);

  const { isConnected } = useContext(ThemeContext);

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
  ];

  return (
    <div className="flex justify-between py-5 px-[140px] items-center">
      <div className="flex items-center">
        <div className="relative mr-[70px] font-extrabold w-[180px] h-10">
          <Image src={logoBlack} fill={true} alt="logo" />
        </div>
        <div className="flex items-center">
          <InputSerach size="md" />
        </div>
      </div>
      <div className="flex justify-between items-center  w-1/3">
        {navigationLinks.map((link, i) => {
          return (
            <div key={i} className="text-lg">
              <Link href={link.href}>{link.label}</Link>
            </div>
          );
        })}
        <ConnectWallet />
        {isConnected && <UserDropDownIcon />}
      </div>
    </div>
  );
};

export default NavBar;
