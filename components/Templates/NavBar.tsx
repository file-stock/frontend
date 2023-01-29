import Link from "next/link";
import { useState } from "react";
import ConnectWallet from "../ConnectWallet";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
  ];

  return (
    <div className="flex justify-between py-5 px-[140px] items-center">
      <div className="flex items-center">
        <div className="mr-[70px] font-extrabold">LOGO</div>
        <div className="flex items-center">
          <input
            className="border border-black rounded-l-md py-2 px-4"
            type="text"
            placeholder="Search for photos"
          />
          <button className="text-sm text-white bg-main font-bold py-[11px] px-4 rounded-r-lg">
            Search
          </button>
        </div>
      </div>
      <div className="flex items-center">
        {navigationLinks.map((link, i) => {
          return (
            <div key={i} className="ml-[39px] text-lg">
              <Link href={link.href}>{link.label}</Link>
            </div>
          );
        })}
        {isLogged ? (
          <div className="ml-[39px] border rounded-md py-2 px-4 font-bold cursor-pointer">
            <Link href="/uploadImage">Upload image</Link>
          </div>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </div>
  );
};

export default NavBar;
