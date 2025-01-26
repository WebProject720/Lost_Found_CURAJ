import { Images } from "../constant";

const Header = () => {
  return (
    <header className="bg-gray-100 p-2 fixed w-screen flex items-center flex-row justify-between">
      <div className="">
        <img src={Images.curaj_full_logo} alt="Logo" className="h-16" />
      </div>
      <div>
      </div>
      <div className="font-bold">
        <div>
          <h1>
            Lost & Found - CURAJ
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;