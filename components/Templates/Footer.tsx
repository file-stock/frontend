import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { logoWhite } from "../../public/index";

const Footer = () => {
  const pageLinks = ["Home", "Explore", "My Profile", "Contact us"];
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
        <div>
          <div className="relative mb-[30px] w-[180px] h-10">
            <Image src={logoWhite} fill={true} alt="logo" />
          </div>
          <div className="w-[400px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            cursus sed nunc eget dictum Sed ornare cursus sed nunc eget dictumd
            nunc eget dictum Sed ornare cursus sed nunc eget dictum
          </div>
        </div>
        <div>
          {pageLinks.map((link, i) => {
            return (
              <div key={i} className="mb-[30px] cursor-pointer">
                {link}
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
        <div className="flex items-center justify-between w-1/5">
          {icons.map((icon, i) => {
            return (
              <div key={i} className="text-2xl cursor-pointer">
                <FontAwesomeIcon icon={icon} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-[80px]">© 2023 Company</div>
    </div>
  );
};
export default Footer;
