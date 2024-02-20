import { useUser } from "@/_auth/useUser";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import UseSignOut from "@/_auth/useSingOut";
import { useEffect } from "react";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import NavList from "./NavList";

export default function LeftBar() {
  const navigate = useNavigate();
  const { CurrentUser } = useUser();
  const { isSuccess, signOut } = UseSignOut();

  useEffect(() => {
    if (isSuccess) navigate("/sign-in");
  }, [isSuccess, navigate]);
  return (
    <nav className="leftsidebar bg-slate-50">
      <div className="flex flex-col  gap-11">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="../../../public/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          ></img>
        </Link>
        <Link
          to={`/profile/${CurrentUser?.$id}`}
          className="flex items-center gap-3"
        >
          <img
            src={
              CurrentUser?.imageUrl ||
              "../../../public/assets/images/profile.png"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          ></img>
          <div className="flex flex-col">
            <p className="body-bold">{CurrentUser?.name}</p>
            <p className="small-regular text-light-3">
              @{CurrentUser?.username}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col">
          {sidebarLinks.map((link: INavLink) => [
            <NavList key={link.label} link={link}></NavList>,
          ])}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/public/assets/icons/logout.svg" alt="loguot"></img>
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
}
