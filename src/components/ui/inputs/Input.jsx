import React, { useState, useRef } from "react";
import { IMaskInput } from "react-imask";
import Icon from "../icon/icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryRu from "../../../assets/icons/countryRu.svg";

function Input({
  label,
  placeholder,
  type = "text",
  value,
  name,
  handleChange,
  rightIcon,
  errorMessage,
  telIcon,
  maxlength,
  required,
  handleClick,
  handleFileChange,
  fileName,
  fileInputRef,
  icon,
  points,
  readOnly = false,
  manualAddressRequired = false,
}) {
  const [error, setError] = useState("");
  const datePickerRef = useRef(null);

  const validateInput = (inputValue) => {
    let isValid = true;

    switch (type) {
      case "text":
        if (required && !inputValue?.trim()) {
          setError(errorMessage || "Поле обязательно");
          isValid = false;
        } else {
          setError("");
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (required && !inputValue) {
          setError(errorMessage || "Поле обязательно");
          isValid = false;
        } else if (inputValue && !emailRegex.test(inputValue)) {
          setError(errorMessage || "Неверный формат E-mail");
          isValid = false;
        } else {
          setError("");
        }
        break;
      case "tel":
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (required && !inputValue) {
          setError(errorMessage || "Поле обязательно");
          isValid = false;
        } else if (inputValue && !phoneRegex.test(inputValue)) {
          setError(errorMessage || "Неверный формат номера");
          isValid = false;
        } else {
          setError("");
        }
        break;
      case "password":
        const minLength = 4;
        if (required && !inputValue) {
          setError(errorMessage || "Поле обязательно");
          isValid = false;
        } else if (inputValue && inputValue.length < minLength) {
          setError(errorMessage || `Минимум ${minLength} символов`);
          isValid = false;
        } else {
          setError("");
        }
        break;
      case "date":
        if (required && !inputValue) {
          setError(errorMessage || "Поле обязательно");
          isValid = false;
          break;
        }
        const dateRegex =
          /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
        if (inputValue && !dateRegex.test(inputValue)) {
          setError(errorMessage || "Формат: дд.мм.гггг");
          isValid = false;
          break;
        }
        if (inputValue) {
          const [day, month, year] = inputValue.split(".").map(Number);
          const date = new Date(year, month - 1, day);
          const today = new Date();

          if (
            date.getDate() !== day ||
            date.getMonth() + 1 !== month ||
            date.getFullYear() !== year
          ) {
            setError(errorMessage || "Некорректная дата");
            isValid = false;
          } else if (date > today) {
            setError(errorMessage || "Дата не может быть в будущем");
            isValid = false;
          } else {
            setError("");
          }
        } else {
          setError("");
        }
        break;
      default:
        setError("");
    }
    return isValid;
  };

  const inputId = `input-${name || Math.random().toString(36).substr(2, 9)}`;

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // +1, так как месяцы с 0
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const parseDate = (str) => {
    if (!str) return null;
    const [day, month, year] = str.split(".").map(Number);
    return new Date(year, month - 1, day, 12); // Добавляем 12:00 для избежания UTC смещения
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleInputChange = (inputValue, mask) => {
    let valueToValidate = inputValue;
    let valueToSend = inputValue;

    if (type === "tel" && mask) {
      valueToValidate = inputValue;
      valueToSend = inputValue ? inputValue.replace(/\D/g, "") : "";
      if (valueToSend && !valueToSend.startsWith("7")) {
        valueToSend = `7${valueToSend}`;
      }
    } else if (type === "date") {
      // inputValue — это Date от DatePicker
      valueToValidate = formatDate(inputValue);
      valueToSend = valueToValidate;
    } else if (name === "bonusPoints") {
      valueToValidate = inputValue.replace(/\D/g, "");
      valueToSend = valueToValidate;
    }

    validateInput(valueToValidate);

    const event = {
      target: {
        name,
        value: valueToSend,
      },
    };
    handleChange(event);
  };

  React.useEffect(() => {
    if (manualAddressRequired && type === "text") {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [manualAddressRequired]);

  return (
    <div className="w-full max-w-full grow mb-[28px]">
      {label && points ? (
        <label
          htmlFor={inputId}
          className="flex items-center gap-[2px] justify-between mb-[11px] text-[#777D88] text-[14px] block"
        >
          {label}
          <div className="flex items-center gap-[4px]">
            <span className="text-[12px] text-medium-gray">Ваши баллы:</span>{" "}
            <span className="text-[15px] text-primary font-bold">
              {points?.toLocaleString("ru-RU")}
            </span>
          </div>
        </label>
      ) : label ? (
        <label
          htmlFor={inputId}
          className="flex items-center gap-[2px] mb-[11px] text-[#777D88] text-[14px] block"
        >
          {label}{" "}
          {icon && (
            <Icon name={icon} className="w-[16px] h-[16px] text-soft-gray" />
          )}
        </label>
      ) : null}

      <div className="relative">
        {type === "tel" ? (
          <IMaskInput
            id={inputId}
            mask="+7 (000) 000-00-00"
            value={value || ""}
            onAccept={handleInputChange}
            name={name}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`w-full pt-[10px] pb-[7px] pr-[40px] ${
              telIcon ? "pl-[22px]" : "pl-0"
            }
              focus:outline-none border-b border-soft-gray text-[20px] text-black placeholder:text-soft-gray ${
                error ? "text-red border-red" : ""
              } ${readOnly ? "text-soft-gray" : "text-black"}`}
            unmask={false}
            overwrite
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={label || placeholder || "Телефонный номер"}
            role="textbox"
            required={required}
          />
        ) : type === "file" ? (
          <div className="flex flex-col mb-[30px] w-full max-w-[393px]">
            <div className="flex items-center gap-[12px]">
              <div
                className="py-[12px] px-[34px] flex items-center justify-center bg-[#FFD900] text-[14px] border-none rounded-[9px] h-[42px] w-full max-w-[111px] cursor-pointer"
                onClick={handleClick}
              >
                Обзор
              </div>
              {fileName && (
                <span className="text-[14px] text-[#666666] truncate max-w-[220px]">
                  {fileName}
                </span>
              )}
            </div>
            <input
              id={inputId}
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              name={name}
              aria-label="Выбрать файл"
              role="button"
              required={required}
            />
            {error && (
              <p
                id={`${inputId}-error`}
                className="text-red text-[12px] mt-[12px]"
              >
                {error}
              </p>
            )}
          </div>
        ) : type === "password" ? (
          <input
            id={inputId}
            type="password"
            value={value || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            name={name}
            placeholder={placeholder}
            className={`w-full pt-[10px] pb-[7px] pr-[40px] focus:outline-none border-b border-soft-gray text-[20px] text-black placeholder:text-soft-gray ${
              error ? "text-red border-red" : ""
            }`}
            autoComplete="new-password"
            inputMode="text"
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={label || placeholder || "Пароль"}
            role="textbox"
            required={required}
          />
        ) : type === "date" ? (
          <DatePicker
            id={inputId}
            ref={datePickerRef}
            selected={parseDate(value) || null}
            onChange={(date) => handleInputChange(date)}
            placeholderText={placeholder || "дд.мм.гггг"}
            dateFormat="dd.MM.yyyy"
            className={`w-full pt-[10px] pb-[7px] pr-[40px] border-b border-soft-gray text-black placeholder:bg-white  placeholder:text-soft-gray text-[20px] focus:outline-none focus:border-soft-gray ${
              error ? "text-red border-red" : ""
            }`}
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            maxDate={new Date()}
            locale="ru"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={label || placeholder || "Дата"}
            required={required}
            utcOffset={6 * 60} // Учет часового пояса +06:00
            autoComplete="off"
          />
        ) : (
          <input
            id={inputId}
            className={`w-full pt-[10px] pb-[7px] pr-[40px] ${
              type === "tel" ? "pl-[22px]" : ""
            }
              focus:outline-none border-b border-soft-gray text-[20px] text-black placeholder:text-soft-gray ${
                error ? "text-red" : ""
              }`}
            type={type}
            placeholder={placeholder}
            maxLength={maxlength ? maxlength : undefined}
            value={value || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            name={name}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={label || placeholder || "Текстовое поле"}
            role="textbox"
            required={required}
            autoComplete={type === "text" ? "off" : undefined}
          />
        )}

        {type === "tel" && telIcon && (
          <img
            src={countryRu}
            alt="countryRu icon"
            className="icon absolute left-0 top-1/2 -translate-y-1/2 w-[12px] h-[9px] pointer-events-none"
            aria-hidden="true"
          />
        )}

        {type === "date" && (
          <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleIconClick}
            aria-label="Открыть календарь"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleIconClick()}
          >
            <Icon
              name="iconData"
              className="w-full max-w-[18px] h-full max-h-[20px] text-medium-gray"
            />
          </span>
        )}

        {rightIcon && type !== "password" && type !== "date" && (
          <img
            src={rightIcon}
            alt="right icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px] p-[2px] pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-red text-[12px] mt-[12px]">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
