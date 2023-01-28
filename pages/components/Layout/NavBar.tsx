import Link from "next/link";
import { FC, useState } from "react";

const NavBar: FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Login", href: "/login" },
  ];

  /* add connect wallet button instead login and signup */

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
          <div
            className="ml-[39px] border rounded-md py-2 px-4 font-bold cursor-pointer"
            onClick={() => setIsLogged((prev) => !prev)}
          >
            Signup
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
