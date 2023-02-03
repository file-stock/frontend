import Main from "./home/Main";
import Header from "./home/Header";
import InputSerach from "../components/InputSearch";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <div className="flex items-center absolute -bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <InputSerach size="lg" />
        </div>
      </div>
      <Main />
      <CreatorOfTheMonth />
      <Gallery />
    </>
  );
}
