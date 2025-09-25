import { Link, NavLink } from 'react-router-dom';
import clsx from "clsx";

/**
 * в зависимости от того, нужна нам просто ссылка или пункт меню,
 * передаем пропс linkType = simple/menu (по умолчанию simple)
 */

function CustomLink(
    {
        children,
        className,
        to,
        linkType = 'simple',
        active = false, // только для простых ссылок
        isDisabled = false
    }) {
    const transition = 'transition-colors duration-200';

    const linkStyles = {
        link: clsx('text-[14px] text-[#727272] font-normal hover:text-[#4080F6]', transition),
        activeLink: '!text-[#4080F6] transition',
        disabled: '!text-[#BFBFBF] !cursor-not-allowed'
    };

    const navLinkStyles = {
        navLink: clsx('text-[15px] text-[#000] font-medium hover:text-[#4080F6]', transition),
        activeNavLink: '!text-[#4080F6]',
        disabled: '!text-[#BFBFBF] !cursor-not-allowed'
    };

    return linkType === 'simple' ? (
        <Link
            to={to}
            onClick={(e) => {
                if (isDisabled) e.preventDefault();
            }}
            className={clsx(
                linkStyles.link,
                active && linkStyles.activeLink,
                isDisabled && linkStyles.disabled,
                className
            )}
        >
            {children}
        </Link>
    ) : (
        <NavLink
            to={to}
            onClick={(e) => {
                if (isDisabled) e.preventDefault();
            }}
            className={({ isActive }) =>
                clsx(
                    navLinkStyles.navLink,
                    isActive && navLinkStyles.activeNavLink,
                    isDisabled && navLinkStyles.disabled,
                    className
                )
            }
        >
            {children}
        </NavLink>
    );
}

export default CustomLink;
