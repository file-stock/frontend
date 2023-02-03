import Image from "next/image";
import { user } from "../public/index";

const ProfileUserPicture = () => {
  return (
    <>
      <div className="flex gap-6 items-center w-2/5">
        <Image
          src={user}
          width={150}
          height={200}
          alt="creator"
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold">Jacon Moore</div>
          <div className="text-lg text-greyText">
            ↓ Instagram Subscription will really support me ♡ Thank you! I love
            vintage, art and clear aesthetic!
          </div>
          <button className="text-sm font-bold text-greyText bg-[#E5E7EB] py-2 px-4 rounded-lg w-1/4">
            View profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileUserPicture;
