import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { logoWhite } from "../../public/index";
import Link from "next/link";

const Footer = () => {
  const pageLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "My Profile", href: "/myProfile" },
    { label: "FAQ", href: "/faq" },
  ];
  const footerLinks = [
    "Terms and condition",
    "Privacy policy",
    "Legal",
    "Frequently asked questions",
  ];
  const icons = [faFacebook, faTwitter, faInstagram, faPinterest];

  return (
    <div className="bg-black text-white  px-[137px] pt-[84px] pb-[24px]">
      <div className="flex justify-between">
        <div className="flex sm:flex-row sm:text-start items-center text-center flex-col justify-between w-full">
          <div>
            <div className="relative mb-[30px] w-[180px] h-10">
              <Image src={logoWhite} fill={true} alt="logo" />
            </div>
            <div className="max-w-[400px] hidden sm:block">
              Web3 take on stock photography which uses blockchain technology to
              protect and sell digital images. It ensures that photographers are
              fairly compensated for their work and that the rights to the
              images are clearly represented.
            </div>
          </div>

          <div>
            {pageLinks.map((link, i) => {
              return (
                <div key={i} className="mb-[30px] cursor-pointer">
                  <Link href={link.href}>
                  {link.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <div>
            {footerLinks.map((link, i) => {
              return (
                <div key={i} className="mb-[30px] cursor-pointer">
                  {link}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-around w-1/5">
            {icons.map((icon, i) => {
              return (
                <div key={i} className="text-2xl cursor-pointer">
                  <FontAwesomeIcon icon={icon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center mt-[80px]">© 2023 FileStock</div>
    </div>
  );
};
export default Footer;
