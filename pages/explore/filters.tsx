import { useState, useEffect, useRef } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FiltersDropdownProps {
  options: FilterOption[];
  defaultOption: string;
  onChange: (value: string) => void;
}

const FiltersDropdown = ({ options, defaultOption, onChange }: FiltersDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: FilterOption) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  const handleOutsideClick = (e: any) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="border border-border rounded-md py-2 px-4 flex items-center justify-between w-[280px] text-black"
      >
        <span className="text-sm font-medium">{selectedOption}</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-[16px]">
          <path d="M6 9l6 6 6-6"/>
        </svg>

      </button>

      {isOpen && (
        <div className="absolute z-10 w-[280px] border border-border rounded-b-mb bg-white divide-y divide-border shadow-md">
          {options.map((option, index) => (
            <button
              key={index}
              className={`${
                selectedOption === option.value ? "bg-gray-100" : ""
              } w-full px-4 py-2 text-sm text-gray-700 hover:bg-main hover:text-white flex justify-center`}
              onClick={() => handleOptionClick(option)}
            >
              <span className=" transform transition-transform hover:scale-110">{option.label}</span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default FiltersDropdown;
