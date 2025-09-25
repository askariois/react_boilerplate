import clsx from "clsx";

/**
 * isActive, isDisabled - для того что бы контролировать состояние кнопки
 * Наример сделать кнопку астивной/заблокированной и поменять ее стили
 * Достаточно передать один из этих пропсов = true
 * */

const Button = ({
  btnType = "medium",
  type = "button",
  children,
  onClick,
  className,
  isActive,
  loading = false,
  isDisabled = false,
  ...props
}) => {
  const handleClick = (e) => {
    if (!onClick) {
      console.log("Вы забыли добавить обработчик нажатия на кнопку");
    } else {
      onClick(e);
    }
  };

  return (
    <button
      {...props}
      className={clsx(
        "flex items-center gap-2 px-2 transition-colors duration-200",
        className,
        {
          "!bg-[#E2E2E2] !text-[#BFBFBF] !cursor-not-allowed": isDisabled,
        }
      )}
      type={type}
      disabled={loading || isDisabled}
      onClick={!isDisabled ? handleClick : undefined}
    >
      {loading ? (
        <div className="flex items-center gap-[4px]">
          <span className="w-[6px] h-[6px] bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-[6px] h-[6px] bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-[6px] h-[6px] bg-current rounded-full animate-bounce"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
