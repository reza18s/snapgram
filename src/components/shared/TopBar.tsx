import { useUser } from "@/_auth/useUser";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import UseSignOut from "@/_auth/useSingOut";
import { useEffect } from "react";

export default function TopBar() {
  const navigate = useNavigate();

  const { CurrentUser } = useUser();
  const { isSuccess, signOut } = UseSignOut();

  useEffect(() => {
    if (isSuccess) navigate("/sing-in");
  }, [isSuccess, navigate]);
  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="../../../public/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          ></img>
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/public/assets/icons/logout.svg" alt="loguot"></img>
          </Button>
          <Link to={`/profile/${CurrentUser?.$id}`}>
            <img
              src={
                CurrentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            ></img>
          </Link>
        </div>
      </div>
    </section>
  );
}
