import { Outlet } from "react-router";
import Header from "../components/header";
import { Images } from "../constant";

const Layout = () => {
  return (
    <div className="bg-gray-200 bg-red_color flex flex-col min-h-screen">
      <Header />
      <main className="mt-[200px]">
        <div className="w-full h-full flex-col flex flex-wrap justify-between items-center content-center">
          <div className="flex flex-col gap-2 bg-gray-100 px-8 py-12 border-[1px] border-black 
            rounded-tl-[60px] rounded-br-[60px] min-h-80 w-2/5">
            <div className="w-full flex content-center justify-center">
              <img src={Images.logo} alt="Login Logo" className="w-[90px] rounded-xl" />
            </div>
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
