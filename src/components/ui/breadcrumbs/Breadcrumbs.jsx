import React from "react";
import { ChevronRight } from "lucide-react"; // Можно заменить на свой SVG

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="hidden md:flex items-center gap-[6px] mt-[13px] mb-[12px] text-medium-gray text-[12px] leading-[22px]">
      {items.map((item, index) => (
        <React.Fragment key={item.href || item.label}>
          {item.href ? (
            <a
              href={item.href}
              className="underline underline-offset-2 hover:medium-gray transition"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-medium-gray">{item.label}</span>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-medium-gray" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
