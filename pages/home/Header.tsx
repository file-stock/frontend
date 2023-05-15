import Link from "next/link";
import GenericButton from "../../components/GenericButton";

const Header = () => {
  return (
    <div className="bg-[#0A001F] text-white flex flex-col justify-center items-center py-[100px]">
      <div className="text-5xl font-extrabold mb-[37px] w-1/3 leading-snug text-center">
        The first NFT Blockchain site for Stock Images
      </div>
      <div className="flex gap-4">
        <Link href={"/explore"}><GenericButton
          label="Find Images"
          size="md"
          variant="mainFull"
          onclick={() => console.log("")}
        /></Link>
        <div className="border font-bold border-white rounded-md py-4 px-8">
          <Link href="/uploadImage">Start Selling</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
