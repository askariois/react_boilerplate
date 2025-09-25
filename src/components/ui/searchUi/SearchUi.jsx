import React, { useState } from "react";
import Button from "../button/Button";

function SearchUi({ placeholder, className }) {
  const [searchValues, setSearchValues] = useState("");

  const handleInputChange = (e) => {
    setSearchValues(e.target.value);
  };

  const handleSearch = () => {
    if (searchValues.trim()) {
      console.log(`Search triggered: ${searchValues}`);
    }
  };

  const handleClear = () => {
    setSearchValues("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const inputId = `search-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-4">
      <div
        className={`flex items-center bg-white rounded-[16px] shadow-[0px_0px_6px_rgba(0,0,0,0.06)] p-[10px] ${className}`}
        role="search"
      >
        <input
          id={inputId}
          type="text"
          value={searchValues}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 pl-[13px] border-none focus:outline-none text-darker-gray placeholder-soft-gray focus:placeholder-darker-gray text-[14px]"
          aria-label={placeholder || "Поиск"}
          aria-describedby={
            searchValues ? `${inputId}-instructions` : undefined
          }
          aria-invalid={!searchValues.trim() && searchValues.length > 0}
        />
        <Button
          type={"button"}
          onClick={handleClear}
          className={
            "mr-[8px] text-[24px] text-soft-gray hover:text-darker-gray cursor-pointer"
          }
          aria-label="Очистить поле поиска"
          tabIndex={0}
        >
          ×
        </Button>

        <Button
          btnType={"searchBlue"}
          type={"button"}
          className={
            "flex items-center gap-2 px-2 transition-colors duration-200 btn-search-blue text-[14px] justify-center"
          }
          onClick={handleSearch}
          aria-label="Выполнить поиск"
          tabIndex={0}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 15C11.5899 15 14.5 12.0899 14.5 8.5C14.5 4.91015 11.5899 2 8 2C4.41015 2 1.5 4.91015 1.5 8.5C1.5 12.0899 4.41015 15 8 15ZM8 16.5C9.9395 16.5 11.7178 15.8098 13.1027 14.6616L14.0513 15.6103C13.9178 16.1107 14.0473 16.6667 14.4398 17.0592L17.4431 20.0625C18.0289 20.6483 18.9786 20.6483 19.5644 20.0625C20.1502 19.4767 20.1502 18.5269 19.5644 17.9412L16.5611 14.9379C16.1685 14.5452 15.6123 14.4158 15.1119 14.5495L14.1632 13.6008C15.3104 12.2162 16 10.4386 16 8.5C16 4.08172 12.4183 0.5 8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5Z"
              fill="white"
            />
          </svg>
          Поиск
        </Button>
        {searchValues && (
          <span id={`${inputId}-instructions`} className="sr-only">
            Нажмите Enter или кнопку поиска для выполнения поиска. Используйте
            кнопку очистки для удаления текста.
          </span>
        )}
      </div>
    </div>
  );
}

export default SearchUi;
