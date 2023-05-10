import {
    Dispatch,
    FC,
    SetStateAction,
    useState,
    useEffect, 
    useRef,
    Key,
  } from "react";

import { tags } from '../public/tags';

type TagSearchProps = {
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
    selectedTagNumbers: number[];
    setSelectedTagNumbers: Dispatch<SetStateAction<number[]>>;
}

const TagSearch: FC<TagSearchProps> = ({
    selectedTags,
    setSelectedTags,
    selectedTagNumbers,
    setSelectedTagNumbers,
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
  
    const filteredTags = Object.values(tags).filter(tag => !selectedTags.includes(tag) && tag.toLowerCase().startsWith(searchTerm.toLowerCase()));
  
    const handleTagClick = (tag: string) => {
        setMenuOpen(false);
        setSelectedTags([...selectedTags, tag]);
        const selectedTagNumber = Object.entries(tags).find(([key, value]) => value === tag)?.[0];
        if (selectedTagNumber) {
          setSelectedTagNumbers([...selectedTagNumbers, parseInt(selectedTagNumber)]);
        }
        setSearchTerm("");
      };

      const handleTagRemove = (tag: string) => {
        setSelectedTags(selectedTags.filter((t: string) => t !== tag));
        const selectedTagNumber = Object.entries(tags).find(([key, value]) => value === tag)?.[0];
        if (selectedTagNumber) {
          setSelectedTagNumbers(selectedTagNumbers.filter((num: number) => num !== parseInt(selectedTagNumber)));
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
      <div className="mt-4">
        <div className="h-20">
        {menuOpen && filteredTags.length > 0 && (
                  <div ref={menuRef} className="absolute z-50 bg-white w-80 shadow-lg rounded-md border-2 border-black mt-[140px]">
                    <ul className="py-2">
                      <li className="relative">
                      </li>
                      {filteredTags.map((tag, i) => (
                        <li
                          key={i}
                          className="px-3 py-2 hover:bg-main hover:text-white  cursor-pointer flex justify-between items-center"
                          onClick={() => handleTagClick(tag)}
                        >
                          <span>{tag}</span>
                          +
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedTags.length > 0 && (
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
        </div>
        
        <input
            type="text"
            placeholder="Example: Rain, Nature, Moutains"
            className="border border-border rounded-md p-3 mb-[35px] mt-[12px] text-[#0A001F] w-80"
            required
            value={searchTerm}
            onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value.length >= 2) {
                    setMenuOpen(true);
                    } else {
                    setMenuOpen(false);
                    }}}
        />
        
      </div>
    );
  };
  
  export default TagSearch;