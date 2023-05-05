import Main from "./home/Main";
import Header from "./home/Header";
import InputSerach from "../components/InputSearch";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";
import { useContext } from "react";
import { ThemeContext } from "../context/context";

export default function Home() {
  const { allFiles } = useContext(ThemeContext);
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
      <div className="flex ml-4 mt-8 gap-1">
        {allFiles.map((file: any, index: any) => { console.log("file tags", file.fileTags) 
        return (
          <Gallery key={index} cid={file[0]} />
        )})}
      </div>
    </>
  );
}