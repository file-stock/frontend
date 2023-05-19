import Main from "./home/Main";
import Header from "./home/Header";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";
import TagSearch from "../components/TagSearch";
import { utils } from "ethers";
import { useContext, useState, useEffect } from "react";
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
  //console.log("allfileshome", allFiles);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [selectedImagesMain, setSelectedImagesMain] = useState<any>([]);

  useEffect(() => {
    const getRandomImages = () => {
      if (!allFiles || allFiles.length === 0) {
        return;
      }
      const randomImages = [];
      const randomImagesMain = [];
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * allFiles.length);
        randomImages.push(allFiles[randomIndex]);
      }
      setSelectedImages(randomImages);
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * allFiles.length);
        randomImagesMain.push(allFiles[randomIndex]);
      }
      setSelectedImagesMain(randomImagesMain);
    };

    getRandomImages();

    const interval = setInterval(() => {
      getRandomImages();
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, [allFiles]);
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
      <Main selectedImagesMain={selectedImagesMain} />

      <CreatorOfTheMonth />
      <div className="grid grid-cols-4 m-2 gap-2 mt-10">
        {selectedImages.map((file: any, index: any) => (
          <Gallery key={index} cid={file[0]} />
        ))}
      </div>
    </>
  );
}
