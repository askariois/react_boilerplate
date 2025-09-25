import React, { useState } from "react";

import Input from "../inputs/Input";

function OrderToggle({ label = "Заказ услуги человек", onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) onChange(newCheckedState);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer mr-[8px]">
          <input
            id="order-toggle"
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only peer"
            aria-checked={isChecked}
            aria-label={label}
          />
          <div
            className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow transition-colors duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
            role="switch"
            aria-checked={isChecked}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          ></div>
        </label>
        <span
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="text-gray-700 font-semibold cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-controls="order-toggle"
          aria-expanded={isChecked}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default OrderToggle;
