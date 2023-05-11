import Main from "./home/Main";
import Header from "./home/Header";
import InputSerach from "../components/InputSearch";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/context";

export default function Home() {
  const { allFiles } = useContext(ThemeContext);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  //console.log("allFiles", allFiles);
  useEffect(() => {
    const getRandomImages = () => {
      if (!allFiles || allFiles.length === 0) {
        return;
      }
      const randomImages = [];
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * allFiles.length);
        randomImages.push(allFiles[randomIndex]);
      }
      setSelectedImages(randomImages);
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
          <InputSerach size="lg" />
        </div>
      </div>
      <Main />
      <CreatorOfTheMonth />
      <div className="flex mt-8">
        {selectedImages.map((file: any, index: any) => (
          <Gallery key={index} cid={file[0]} />
        ))}
      </div>
    </>
  );
}
