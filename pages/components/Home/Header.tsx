const Header = () => {
  return (
    <div className="bg-[#0A001F] text-white flex flex-col justify-center items-center py-[100px]">
      <div className="text-5xl font-extrabold mb-[37px] w-1/3 leading-snug text-center">
        The first NFT Blockchain site for Stock Images
      </div>
      <div className="flex">
        <div className="bg-main rounded-md py-4 px-8 mr-4">Find Images</div>
        <div className="border border-white rounded-md py-4 px-8">
          Start Selling
        </div>
      </div>
    </div>
  );
};

export default Header;
