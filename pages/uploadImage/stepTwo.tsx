import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  useRef,
  Key,
} from "react";
import Image from "next/image";
import { ThemeContext } from "../../context/context";
import PopupMessage from "../../components/PopupMessage";
import { tags } from "../../public/tags";

type StepTwoProps = {
  onSelectFile: any;
  fileInputRef: React.MutableRefObject<null>;
  selectedFile: string;
  preview: string;
  setTitle: Dispatch<SetStateAction<any>>;
  setStep: Dispatch<SetStateAction<number>>;
  setDescription: Dispatch<SetStateAction<string>>;
  onChangeTitle: (e: any) => void;
  handleFileChange: () => void;
  hashValue: string;
};

const StepTwo: FC<StepTwoProps> = ({
  onSelectFile,
  fileInputRef,
  selectedFile,
  preview,
  handleFileChange,
  setTitle,
  setStep,
  setDescription,
  hashValue,
}) => {
  const {
    setPrice,
    selectedTags,
    setSelectedTags,
    selectedTagNumbers,
    setSelectedTagNumbers,
    isConnected,
    popupMessage,
    setPopupMessage,
    isErrorPopupVisible,
    setIsErrorPopupVisible,
  } = useContext(ThemeContext);

  const forms = [
    /*{ label: "Title of the image", type: "text", required: true},
  { label: "Description", type: "text"},*/
    { label: "Tags", type: "text", required: true },
    { label: "Price", type: "number", required: true },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);
  const filteredTags = Object.values(tags).filter(
    (tag) =>
      !selectedTags?.includes(tag) &&
      tag.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag: string) => {
    setMenuOpen(false);
    setSelectedTags([...selectedTags, tag]);
    const selectedTagNumber = Object.entries(tags).find(
      ([key, value]) => value === tag
    )?.[0];
    if (selectedTagNumber) {
      setSelectedTagNumbers([
        ...selectedTagNumbers,
        parseInt(selectedTagNumber),
      ]);
    }
    setSearchTerm("");
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t: string) => t !== tag));
    const selectedTagNumber = Object.entries(tags).find(
      ([key, value]) => value === tag
    )?.[0];
    if (selectedTagNumber) {
      setSelectedTagNumbers(
        selectedTagNumbers.filter(
          (num: number) => num !== parseInt(selectedTagNumber)
        )
      );
    }
  };

  const handleOutsideClick = (e: any) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  const uploadImage = async () => {
    handleFileChange();
  };

  const handleButtonClick = async () => {
    try {
      if (!isConnected) {
        setPopupMessage("Connect your wallet");
        setIsErrorPopupVisible(true);
      } else if (isButtonDisabled) {
        setPopupMessage("Wrong price");
        setIsErrorPopupVisible(true);
      } else {
        await uploadImage();
      }
    } catch (error: any) {
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        setPopupMessage("You don't have enough funds");
      } else if (error.code === "INVALID_ARGUMENT") {
        setPopupMessage("Image not found");
      } else if (error.code === -32603) {
        setPopupMessage("Can't load image");
      } else if (error.code === "ACTION_REJECTED") {
        setPopupMessage("User denied signature");
      } else {
        setPopupMessage("Error");
      }
      console.log("error", error.code);
      setIsErrorPopupVisible(true);
    } finally {
      setTimeout(() => {
        setIsErrorPopupVisible(false);
      }, 2500);
    }
  };

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
                <label className="text-xl font-medium">
                  {form.label}
                  {form.required && <span className="text-[#D0312D]">*</span>}
                </label>
                {
                  /*form.label === "Description" ? (
                  <textarea
                    onChange={(e) =>
                      form.label === "Description" &&
                      setDescription(e.target.value)
                    }
                    placeholder="type here"
                    className="border border-border rounded-md p-3 my-4"
                  />
                  ) :*/ <input
                    type={form.type}
                    placeholder={
                      form.label === "Tags"
                        ? "Example: Rain, Nature, Moutains"
                        : form.label === "Price"
                        ? "Price between 0.1 and 1000"
                        : "type here"
                    }
                    className="border border-border rounded-md p-3 mb-[35px] mt-[12px] text-[#0A001F]"
                    required
                    value={form.label === "Tags" ? searchTerm : undefined}
                    onChange={(e) => {
                      {
                        /*if (form.label === "Title of the image") {
                        setTitle(e.target.value);
                      } else*/
                      }
                      if (form.label === "Price") {
                        const price = Number(e.target.value);
                        setPrice(price);
                        setIsButtonDisabled(price < 0.1 || price > 1000);
                      } else if (form.label === "Tags") {
                        setSearchTerm(e.target.value);
                        if (e.target.value?.length >= 2) {
                          setMenuOpen(true);
                        } else {
                          setMenuOpen(false);
                        }
                      }
                    }}
                  />
                }
                {menuOpen &&
                  form.label === "Tags" &&
                  filteredTags?.length > 0 && (
                    <div
                      ref={menuRef}
                      className="absolute z-50 bg-white w-80 shadow-lg rounded-md border-2 border-black mt-24"
                    >
                      <ul className="py-2">
                        <li className="relative"></li>
                        {filteredTags.map((tag, i) => (
                          <li
                            key={i}
                            className="px-3 py-2 hover:bg-main hover:text-white  cursor-pointer flex justify-between items-center"
                            onClick={() => handleTagClick(tag)}
                          >
                            <span>{tag}</span>+
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {selectedTags?.length > 0 && form.label === "Tags" && (
                  <div className="flex flex-wrap mb-6">
                    {selectedTags.map((tag: string, i: Key) => (
                      <div
                        key={i}
                        className="bg-main text-white rounded-md px-3 py-1 flex justify-between items-center mr-2 mb-2"
                      >
                        <span className="mr-2">{tag}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleTagRemove(tag)}
                        >
                          x
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            );
          })}
          <PopupMessage
            isVisible={isErrorPopupVisible}
            message={popupMessage}
            onClose={() => setIsErrorPopupVisible(false)}
          />
          <div className="mt-[40px]">
            <div onClick={handleButtonClick} className="button-wrapper w-fit">
              <button
                //  disabled={!isConnected || isButtonDisabled}
                className={`text-white font-bold mr-4 px-5 py-2.5  ${
                  isButtonDisabled || !isConnected ? "bg-[#622774]" : "bg-main"
                } border border-main rounded-md`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
