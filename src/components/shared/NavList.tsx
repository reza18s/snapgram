import { NavLink, useLocation } from "react-router-dom";

export default function NavList({ link }) {
  const { pathname } = useLocation();
  const isActive = pathname === link.route;
  return (
    <li className={`leftsidebar-link group  ${isActive && " bg-primary-500"}`}>
      <NavLink className="flex items-center gap-4 p-4 " to={link.route}>
        <img
          src={link.imgURL}
          alt={link.label}
          className={`group-hover:invert-white ${isActive && "invert-white"}`}
        ></img>
        {link.label}
      </NavLink>
    </li>
  );
}
