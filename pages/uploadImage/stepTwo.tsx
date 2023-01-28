import { Dispatch, FC, SetStateAction } from "react";
import Image, { StaticImageData } from "next/image";

type StepTwoProps = {
  onSelectFile: (e: any) => void;
  fileInputRef: React.MutableRefObject<null>;
  selectedFile: string;
  preview: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  onChangeTitle: (e: any) => void;
  uploadOnLightHouse: () => void;
};

const StepTwo: FC<StepTwoProps> = ({
  onSelectFile,
  fileInputRef,
  selectedFile,
  preview,
  uploadOnLightHouse,
  setTitle,
  setPrice,
}) => {
  const forms = [
    { label: "Title of the image", type: "text" },
    { label: "Description", type: "text" },
    { label: "Keywords", type: "text" },
    { label: "Price", type: "number" },
    { label: "Web3 Wallet Address", type: "text" },
  ];

  return (
    <>
      <div className="flex gap-6 pb-[175px]">
        <div className="flex flex-col gap-3 mr-4">
          {selectedFile && (
            <>
              {preview && (
                <Image
                  src={preview}
                  alt="small image"
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              )}
              <label
                htmlFor="importFile"
                className="text-main text-2xl flex justify-center items-center border-dashed border-[1px] w-[100px] h-[90px] rounded-lg cursor-pointer"
              >
                +
              </label>
              <input
                className="hidden"
                type="file"
                id="importFile"
                onChange={onSelectFile}
                ref={fileInputRef}
              />
            </>
          )}
        </div>
        <div className="w-1/3">
          {selectedFile && preview && (
            <Image
              src={preview}
              alt="image"
              width={400}
              height={400}
              className="rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-col w-2/3">
          {forms.map((form, i) => {
            return (
              <form key={i} className="flex flex-col max-w-2xl">
                <label className="text-xl font-medium">{form.label}</label>
                {form.label === "Description" ? (
                  <textarea
                    placeholder="type here"
                    className="border border-border rounded-md p-3 my-4"
                  />
                ) : (
                  <input
                    type={form.type}
                    placeholder="type here"
                    className="border border-border rounded-md p-3 mb-[35px] mt-[12px] text-[#0A001F]"
                    required
                    onChange={(e) => {
                      form.label === "Title of the image"
                        ? setTitle(e.target.value)
                        : form.label === "Price" && setPrice(e.target.value);
                    }}
                  />
                )}
              </form>
            );
          })}
          <div className="font-medium mt-4 text-[#0A001F]">Balance: 20413</div>
          <div className="mt-[40px]">
            <button
              onClick={() => uploadOnLightHouse()}
              className="text-white font-bold mr-4 px-5 py-2.5 bg-main border border-main rounded-md"
            >
              Upload
            </button>
            <button className="px-7 font-bold text-main py-2.5 border border-main rounded-md">
              Mint
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
