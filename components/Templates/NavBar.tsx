import Link from "next/link";
import { useContext, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import Image from "next/image";
import TagSearch from "../TagSearch";
import { logoBlack } from "../../public/index";
import UserDropDownIcon from "../UserDropDownIcon";
import { ThemeContext } from "../../context/context";
import { useRouter } from 'next/router';

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(true);
  const { isConnected, selectedTags, setSelectedTags, selectedTagNumbers, setSelectedTagNumbers  } = useContext(ThemeContext);
  const router = useRouter();
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
        <TagSearch
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedTagNumbers={selectedTagNumbers}
          setSelectedTagNumbers={setSelectedTagNumbers}
          btn={true}
          size="md"
        />
        </div>
      </div>
      <div className="flex justify-between items-center  w-1/3">
      {navigationLinks.map((link, i) => {
          const isCurrentPage = router.pathname === link.href;
          return (
            <div key={i} className="text-lg">
              <Link href={link.href}>
                <div className={isCurrentPage ? "cursor-default border-b" : ""} onClick={(e) => isCurrentPage && e.preventDefault()}>{link.label}</div>
              </Link>
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
