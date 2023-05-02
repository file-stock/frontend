import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/context";
import Image from "next/image";
//import { src, src2, src3 } from "./SourceGallery";

import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const Gallery = () => {
  const { allFiles } = useContext(ThemeContext);
  const [fileURL, setFileURL] = useState<string | null>(null);
  //const images = [src, src2, src3];

  console.log("allFilessss", allFiles);

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  // const decrypt = async () => {
  //   const cid = "QmfFLXPTFgaWxki26rFpkbQVKN8ohTgVnKxsBLNeacxVYV";
  //   const { publicKey, signedMessage } = await encryptionSignature();
  //   const keyObject = await lighthouse.fetchEncryptionKey(
  //     cid,
  //     publicKey,
  //     signedMessage
  //   );
  //   const fileType = "image/jpeg";
  //   const decryted = await lighthouse.decryptFile(fileType, keyObject.data.key);
  //   console.log(decryted);

  //   const url = URL.createObjectURL(decryted);
  //   console.log(url);
  //   setFileURL(url);
  //   console.log("fileURL", fileURL);
  // };

  // useEffect(() => {
  //   decrypt();
  // }, []);

  return (
    <div className="gallery">
      <div className="gallery-item">
        {allFiles.map((src, index) => {
          //console.log("src", src);
          return (
            <div className="flex gap-x-3 m-8 w-full">
              <Image
                className="border-2 rounded-lg shadow-lg mb-3 transition  duration-500 ease-in-out transform hover:scale-110"
                key={index}
                src={src}
                width={300}
                height={300}
                alt="Picture of the author"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
