import React, { useState, useRef, useEffect } from "react";

function CustomSelect({
  options = [],
  placeholder = "Выберите",
  onChange,
  value,
  label,
  id,
  className,
  isSearch = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option.value);
    setIsOpen(false);
    onChange?.(option.value);
  };
  useEffect(() => {
    console.log("CustomSelect value:", value); // Логируем value для отладки
    setSelected(value?.value ?? ""); // Используем ?? для обработки null/undefined
  }, [value]);
  console.log("selected", value);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;
  console.log("selectedLabel", selectedLabel);
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className={`custom-select-container relative w-full md:max-w-[393px] ${
        className ? className : "md:min-w-[393px]"
      } mt-[50px] mb-[50px]`}
      ref={dropdownRef}
    >
      {label && (
        <label className="mb-[11px] text-[#777D88] text-[14px] block">
          {label}
        </label>
      )}

      <div
        className={`custom-select-opener cursor-pointer border-b border-[#cbcbcb] py-[10px] pt-[13px] flex justify-between items-center relative ${
          isSearch ? "search" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`text-[20px] ${
            selected ? "text-black" : "text-soft-gray"
          }`}
        >
          {selectedLabel}
        </span>
      </div>

      <input type="hidden" name={id} value={selected} />

      {isOpen && (
        <div className="custom-select-panel absolute top-[calc(100%+11px)] w-full bg-white z-10 max-h-[192px] overflow-y-auto">
          {options.length ? (
            options.map((option) => (
              <div
                key={option.value}
                className="text-[16px] py-[7px] cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="py-2 px-3 text-gray-400">Нет вариантов</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
