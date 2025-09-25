import React from "react";

interface IconProps {
  name: string;
  className?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (

    <svg className={`${className} w-6 h-6`}  {...props}>
      <use href={`/src/assets/icon-sprite.svg#${name}`}></use>
    </svg>
  );
};

export default Icon;
