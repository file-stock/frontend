import Image from "next/image";
import { FC } from "react";

import { uploadIcon } from "../../public";

type StepOneProps = {
  onSelectFile: any;
  fileInputRef: React.MutableRefObject<null>;
  selectedFile: string;
  preview: string;
  setEncriptedSinteticBaseEvent: any;
};

const StepOne: FC<StepOneProps> = ({
  onSelectFile,
  fileInputRef,
  selectedFile,
  preview,
  setEncriptedSinteticBaseEvent,
}) => {

  return (
    <>
      <div className="border-dashed border-[1px] border-main flex flex-col justify-center items-center py-[120px]">
        <Image src={uploadIcon} width={60} height={60} alt="uploadImage" />
        <div className="text-3xl font-medium my-4">Drag and drop to upload</div>
        <div className="mb-10 text-border flex justify-center items-center">
          <div className="border-b-[1px] w-20"></div>
          <div className="mx-2">or</div>
          <div className="border-b-[1px] w-20"></div>
        </div>
        <label
          htmlFor="importFile"
          className="text-white bg-main py-2 px-4 rounded-lg cursor-pointer"
        >
          Browse
        </label>
        <input
          className="hidden"
          type="file"
          id="importFile"
          onChange= {onSelectFile}
          ref={fileInputRef}
        />
        {selectedFile && (
          <Image src={preview} alt="image" width={400} height={400} />
        )}
      </div>
      <div className="text-center mt-[57px] mb-[77px]">
        PNG, JPEG, JPG (Max size: 100MB)
      </div>
    </>
  );
};

export default StepOne;
