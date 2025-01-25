import { Outlet } from "react-router";
import Header from "../components/header";
import { Images } from "../constant";

const Layout = () => {
  return (
    <div className="bg-amber-200 min-h-screen">
      <Header />
      <main className="">
        <div className="">
          <div className="">
            <div className="w-full flex content-center justify-center">
              <img src={Images.logo} alt="Login Logo" className="w-[50px]" />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
