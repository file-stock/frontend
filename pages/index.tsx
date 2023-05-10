import Main from "./home/Main";
import Header from "./home/Header";
import InputSerach from "../components/InputSearch";
import CreatorOfTheMonth from "./home/CreatorOfTheMonth";
import Gallery from "./home/Gallery";

import React from "react";
import { ThemeContext } from "../context/context";
import { useContext } from "react";

function getRandomIndices(arrLength, numIndices) {
  const indices = new Set();
  while (indices.size < numIndices) {
    indices.add(Math.floor(Math.random() * arrLength));
  }
  return [...indices];
}

export default function Home() {
  const { allFiles } = useContext(ThemeContext);
  console.log("allfileshome", allFiles);

  const randomIndices = getRandomIndices(allFiles.length, 7);


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
        {randomIndices.map((index: any) => (
          <Gallery key={String(index)} cid={allFiles[index].watermarkedCid} />
        ))}
      </div>
    </>
  );
}