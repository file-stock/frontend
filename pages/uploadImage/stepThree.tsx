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
  const router = useRouter();
  useEffect(() => {
    const getFiles = async () => {
      try {
        const uploads = await lighthouse.getUploads(
          userAddress
        );
        console.log("UPLOADS", uploads);
        router.push("/myProfile");
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    getFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return <div></div>;
};

export default StepThree;
