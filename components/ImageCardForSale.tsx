import { FC } from "react";
import Image from "next/image";

import { filecoinIcon, deleteIcon, imageLicenzeIcon } from "../public";

type ImageCardForSaleProps = {
  img: any;
  title: string;
  description: string;
  price: any;
  downloadButton: boolean;
  tags?: string;
  tagsId?: number;
  deleteButton?: boolean;
  onDelete?: (id: any) => void;
};

const ImageCardForSale: FC<ImageCardForSaleProps> = ({
  tagsId,
  tags,
  img,
  title,
  description,
  price,
  downloadButton,
  deleteButton,
  onDelete,
}) => {
  return (
    <>
      <div className="sm:flex sm:gap-5 md:flex md:gap-5 lg:flex lg:gap-5 xl:flex xl:gap-5 2xl:flex 2xl:gap-5">
        <div className="relative w-[330px] h-[280px]">
          {img ? (
            <Image src={img} alt="myImages" className="rounded-lg" fill />
          ) : (
            <div>Loading Image...</div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex items-center  text-3xl font-semibold gap-3">
            <Image src={filecoinIcon} width={15} height={15} alt="filecoin" />
            {price}
          </div>
          <div>
            {tags} - {tagsId}
          </div>
          <div className="text-md max-w-[420px]">{description}</div>
          <div>
            <div className="flex items-center gap-3">
              {downloadButton && (
                <div className="bg-main text-white py-2 px-4 cursor-pointer rounded-lg font-semibold text-lg">
                  <a href={img} download>
                    Download Image
                  </a>
                </div>
              )}
              {deleteButton && (
                <div
                  className="border border-border rounded-lg py-3.5 px-4 cursor-pointer"
                  onClick={onDelete}
                >
                  <Image src={deleteIcon} width={15} height={15} alt="delete" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Image
              src={imageLicenzeIcon}
              width={10}
              height={10}
              alt="img-licenze"
            />
            <div className="text-main cursor-pointer text-xs underline underline-offset-4">
              View and manage liscense
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCardForSale;
