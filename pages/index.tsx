import Header from "../components/Home/Header";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <div className="flex items-center absolute -bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input
            className="rounded-l-md py-4 px-4 w-[600px]"
            type="text"
            placeholder="Search for photos"
          />
          <button className="text-sm text-white bg-main font-bold py-[19px] px-8 rounded-r-lg">
            Search
          </button>
        </div>
      </div>
    </>
  );
}
