import { Images } from "../constants.astro";
import { Button } from "./utility/Button";
import { getStoreData } from "../store";
import { logoutUser } from "../APIs/auth/logout";
export const Navbar = (props) => {
  const store = getStoreData();

  const user = store.loggedUser;


  // let headerHeight = document.getElementById("header")?.offsetHeight;
  // let afterHeader = document.getElementsByTagName("main")[0];

  // if (afterHeader) {
  //   afterHeader.style.marginTop = `${(headerHeight || 0) + 5}px`;
  // }

  return (
    <header
      id="header"
      className="bg-gray-100 z-50 top-0 border-b-2 border-gray-400/20 p-2 fixed w-full flex items-center flex-row justify-between shadow-xl shadow-gray-300 px-8"
    >
      <div className="w-full h-full">
        <img
          src={Images.curaj_full_logo.src}
          alt="Logo"
          className="h-16 w-auto phone:h-auto phone:w-40"
        />
      </div>
      <div>
        <h1>
        </h1>
      </div>
      <div className="font-bold phone:hidden">
        {
          !store.isUserLogged || !store.loggedUser ? (
            ""
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="">
                <Button onClick={logoutUser}>Logout</Button>
              </div>
              <div className="flex flex-row cursor-pointer group gap-2 items-center justify-center bg-transparent p-2 rounded-md">
                <div>
                  <img src={Images.userIcon} className="desktop:w-10 w-60" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-0">
                <h1>
                  <center>{user?.username || "Username"}</center>
                </h1>
                <p className="text-sm font-light">{user?.email || ""}</p>
              </div>
            </div>
          )
        }
      </div>
      <div>
        {props.children}
      </div>
    </header>
  )
}