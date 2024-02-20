import { Outlet } from "react-router";
import LeftBar from "@/components/shared/LeftBar";
import TopBar from "@/components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";
export default function RootLayout() {
  return (
    <div className="min-h-screen w-full  md:flex">
      <TopBar></TopBar>
      <LeftBar></LeftBar>

      <section className="flex h-full flex-1">
        <Outlet></Outlet>
      </section>
      <BottomBar></BottomBar>
    </div>
  );
}
