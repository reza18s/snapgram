import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to={"/"}></Navigate>
      ) : (
        <>
          <section className="login_page flex h-dvh flex-1 flex-col items-center justify-center py-10">
            <Outlet></Outlet>
          </section>
          <img
            src="/assets/images/side-img.svg "
            className="hidden h-dvh min-h-[900px] w-1/2 object-cover xl:flex"
          ></img>
        </>
      )}
    </>
  );
}
