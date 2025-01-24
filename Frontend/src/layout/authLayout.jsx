import { Outlet } from "react-router";
import Header from "../components/header";

const Layout = () => {
  return (
    <div>
      <link rel="stylesheet" href=".\src\CSS\auth.css" />
      <Header />
      <main className="">
        <div className="login-container">
          <div className="login-box">
            <div className="w-full flex content-center justify-center">
              <img src='.\src\assets\lost.jpeg' alt="Login Logo" className="login-logo" />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
