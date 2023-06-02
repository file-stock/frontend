import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import ConnectWallet from "../ConnectWallet";
import Image from "next/image";
import TagSearch from "../TagSearch";
import { logoBlack } from "../../public/index";
import UserDropDownIcon from "../UserDropDownIcon";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../context/context";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRef2 = useRef<HTMLDivElement>(null);

  const {
    isConnected,
    selectedTags,
    setSelectedTags,
    selectedTagNumbers,
    setSelectedTagNumbers,
    cart,
  } = useContext(ThemeContext);
  const router = useRouter();

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
  ];

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (menuRef.current && !menuRef.current.contains(event.target as Node)) ||
      (menuRef2.current && !menuRef2.current.contains(event.target as Node))
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleResize = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleaddToCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="flex justify-between py-5 px-[140px] items-center sticky top-0 z-50 bg-white opacity-90 hover:opacity-100">
      <div className="flex items-center">
        <div className="relative font-extrabold w-52 h-10 mr-5">
          <Link href={"/"}>
            <Image src={logoBlack} fill={true} alt="logo" />
          </Link>
        </div>
        <div className="flex items-center">
          <button
            className=" xl:hidden absolute right-7 cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            {!isMenuOpen && (
              <svg
                className="h-6 w-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        <div className={`flex items-center hidden md:flex`}>
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
      <div
        className={`flex justify-between items-center w-1/3 ${
          isMenuOpen
            ? "flex border-2 flex-col justify-around bg-main absolute right-0 top-0 w-[100vw] h-[300px]"
            : "hidden"
        } xl:flex `}
        ref={menuRef2}
      >
        {isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(false)}
            className="xl:hidden absolute right-7 top-7 cursor-pointer"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="3" x2="21" y2="21"></line>
              <line x1="21" y1="3" x2="3" y2="21"></line>
            </svg>
          </button>
        )}
        {navigationLinks.map((link, i) => {
          const isCurrentPage = router.pathname === link.href;
          return (
            <div key={i} className="text-lg">
              <Link href={link.href}>
                <div
                  className={isCurrentPage ? "cursor-default border-b" : ""}
                  onClick={(e) => isCurrentPage && e.preventDefault()}
                >
                  {link.label}
                </div>
              </Link>
            </div>
          );
        })}
        <div
          onClick={handleaddToCartClick}
          className="text-xl cursor-pointer relative"
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            size="2x"
            className="text-2xl"
          />
          {totalQuantity > 0 && (
            <span className="text-white bg-error text-sm rounded-full px-2 py-1 absolute left-5 bottom-4">
              {totalQuantity}
            </span>
          )}
        </div>
        <ConnectWallet className={`${isMenuOpen && "border-border mb-5"}`} />
        {isConnected && <UserDropDownIcon />}
        {isMenuOpen && isConnected && <Link href="/myProfile">My profile</Link>}
      </div>
    </div>
  );
};

export default NavBar;
