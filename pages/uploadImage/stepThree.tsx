import Link from "next/link";
import { FC, useEffect, useContext, useState } from "react";
import ImageCardForSale from "../../components/ImageCardForSale";
import lighthouse from "@lighthouse-web3/sdk";
import { ThemeContext } from "../../context/context";
import { useRouter } from "next/router";

type StepThreeProps = {
  imageForSale: any[];
};

const StepThree: FC<StepThreeProps> = () => {
  const { userAddress } = useContext(ThemeContext);
  //console.log("IMAGE FOR SALE", imageForSale);
  const router = useRouter();
  useEffect(() => {
    const getFiles = async () => {
      // const lighthouse = require("@lighthouse-web3/sdk");
      try {
        const uploads = await lighthouse.getUploads(
          //"310ae584-7656-4940-b42f-397d73cfca5f"
          userAddress
        );
        console.log("UPLOADS", uploads);
        router.push("/myProfile");
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    getFiles();
  }, [userAddress]);

  return <div></div>;
};

export default StepThree;
