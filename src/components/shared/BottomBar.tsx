import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

export default function BottomBar() {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`flex-center flex-col  p-3 transition ${
              isActive && "rounded-[10px]  bg-primary-500"
            }`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={25}
              height={25}
              className={`${isActive && "invert-white "}`}
            ></img>
          </Link>
        );
      })}
    </section>
  );
}
