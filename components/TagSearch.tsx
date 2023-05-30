import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  Key,
} from "react";
import { useRouter } from "next/router";
import { tags } from "../public/tags";
import Link from "next/link";

type TagSearchProps = {
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  selectedTagNumbers: number[];
  setSelectedTagNumbers: Dispatch<SetStateAction<number[]>>;
  btn: boolean;
  defaultSearchTerm?: string;
  size: "md" | "lg";
};

const TagSearch: FC<TagSearchProps> = ({
  selectedTags,
  setSelectedTags,
  selectedTagNumbers,
  setSelectedTagNumbers,
  btn,
  defaultSearchTerm = "",
  size,
}) => {
  const [inputValue, setInputValue] = useState(defaultSearchTerm);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const tagsLeft = 10 - selectedTags.length;
  const filteredTags = Object.values(tags).filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSearchClick = () => {
    router.push({
      pathname: "/explore",
      query: { search: searchTerm },
    });
    setInputValue("");
  };



  const handleTagClick = (tag: string) => {
    if (selectedTags.length < 10) {
      setMenuOpen(false);
      if (btn) {
        setInputValue(tag);
        setSearchTerm(tag);
      } else {
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
      }
    } else {
      alert("10 tags limit reached!");
    }
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

  return (
    <div>
      <div className={`${!btn && "h-[70px]"}`}>
        {menuOpen && filteredTags.length > 0 && (
          <div
            ref={menuRef}
            className={`absolute z-50 bg-white shadow-lg rounded-md border-2 border-black ${
              !btn && "top-[80px]"
            } ${size === "lg" ? "mt-[58px] w-80" : "mt-[40px] w-64"}`}
          >
            <ul className="py-2">
              {filteredTags.map((tag, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-main hover:text-white cursor-pointer flex justify-between items-center"
                  onClick={() => handleTagClick(tag)}
                >
                  <span className="transform transition-transform hover:scale-110">
                    {tag}
                  </span>
                  {!btn && "+"}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!btn && selectedTags.length > 0 && (
          <div className="flex flex-wrap mb-10">
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
      </div>
      <div className="flex relative justify-center">
        <div>
          <input
            type="text"
            placeholder={
              btn
                ? "Search for photos"
                : `Example: Rain, Nature, Moutains... ${tagsLeft} tags left. `
            }
            className={`border border-border rounded-md text-[#0A001F] shadow-md ${
              size === "lg" && !btn
                ? "py-4 px-4 md:w-[600px] w-[390px] mt-3"
                : size === "lg"
                ? "py-4 px-4 md:w-[600px] w-[300px]"
                : "py-2 px-4"
            }`}
            required
            value={btn ? inputValue : searchTerm}
            onChange={(e) => {
              if (btn) {
                setInputValue(e.target.value);
              }
              setSearchTerm(e.target.value);
              if (e.target.value.length >= 2) {
                setMenuOpen(true);
              } else {
                setMenuOpen(false);
              }
            }}
          />
        </div>
        {btn && (
          <button
            className={`text-sm text-white bg-main font-bold rounded-r-lg shadow-md ${
              size === "lg"
                ? "py-[19px] px-8 absolute right-[-2px]"
                : "py-[11px] px-4 absolute right-[-70px]"
            }`}
            onClick={handleSearchClick}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default TagSearch;
