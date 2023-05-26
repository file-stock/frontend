import Main from "./home/Main";
import Header from "./home/Header";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";
import TagSearch from "../components/TagSearch";
import { utils } from "ethers";
import { useContext } from "react";
import { ThemeContext } from "../context/context";

// function getRandomIndices(arrLength, numIndices) {
//   const indices = new Set();
//   while (indices.size < numIndices) {
//     indices.add(Math.floor(Math.random() * arrLength));
//   }
//   return [...indices];
// }

export default function Home() {
  const {
    allFiles,
    selectedTags,
    setSelectedTags,
    selectedTagNumbers,
    setSelectedTagNumbers,
  } = useContext(ThemeContext);
  console.log("allFiles", allFiles);
  return (
    <>
      <div className="relative">
        <Header />
        <div className="flex items-center absolute -bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TagSearch
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedTagNumbers={selectedTagNumbers}
            setSelectedTagNumbers={setSelectedTagNumbers}
            btn={true}
            size="lg"
          />
        </div>
      </div>
      <Main />

      <CreatorOfTheMonth />
      <Gallery />
    </>
  );
}
