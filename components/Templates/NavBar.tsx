import Link from "next/link";
import { useState } from "react";
import ConnectWallet from "../ConnectWallet";
import InputSerach from "../InputSearch";
import Image from "next/image";

import { user, logoBlack } from "../../public/index";
import UserDropDownIcon from "../UserDropDownIcon";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(true);

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
  ];

  return (
    <div className="flex justify-between py-5 px-[140px] items-center">
      <div className="flex items-center">
        <div className="relative mr-[70px] font-extrabold w-[180px] h-10 shadow-lg">
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
        {isLogged && <UserDropDownIcon />}
      </div>
    </div>
  );
};

export default NavBar;
