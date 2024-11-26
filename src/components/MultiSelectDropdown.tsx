import React, { useRef, useEffect } from "react";
import { MultiSelectDropdownProps, Option } from "./MultiSelectDropdownProps";

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  search,
  onSearchChange,
  onSelectedChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (option: Option) => {
    const isSelected = selected.some((item) => item.id === option.id);
    const newSelected = isSelected
      ? selected.filter((item) => item.id !== option.id)
      : [...selected, option];
    onSelectedChange(newSelected);
    onSearchChange(""); // Clear search after selection
  };

  const removeChip = (id: number) => {
    const newSelected = selected.filter((item) => item.id !== id);
    onSelectedChange(newSelected);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input with Chips */}
      <div
        className="flex items-center flex-wrap border rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((item) => (
          <div
            key={item.id}
            className="flex items-center px-2 py-1 bg-gray-200 rounded-full text-sm mr-2 mb-1"
          >
            {item.label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeChip(item.id);
              }}
              className="ml-1 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search and select products..."
          className="flex-grow outline-none py-1"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={handleInputFocus}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto w-full">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
                  selected.some((item) => item.id === option.id)
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => toggleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
