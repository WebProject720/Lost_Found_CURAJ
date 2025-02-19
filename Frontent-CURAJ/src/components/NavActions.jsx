import { Images } from "../constants.astro";
import { Button } from "./utility/Button";
import { getStoreData } from "../store";
import { logoutUser } from "../APIs/auth/logout";
import { useEffect, useState } from "react";

export const NavActions = (props) => {
  const [store, setStore] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // if (typeof window !== undefined) {
    const storeData = getStoreData();
    setStore(storeData);
    setUser(storeData.loggedUser);
    // }
  }, [])

  return (
    <div className="font-bold">
      {
        !store?.isUserLogged || !store?.loggedUser ? (
          ""
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div className="">
              <Button onClick={logoutUser}>Logout</Button>
            </div>
            <div className="phone:hidden flex flex-row">
              <div className="flex flex-row cursor-pointer group gap-2 items-center justify-center bg-transparent p-2 rounded-md">
                <div>
                  <img
                    src={Images?.userIcon}
                    className="desktop:w-10 w-20"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-0">
                <h1>
                  <center>{user?.username || "Username"}</center>
                </h1>
                <p className="text-sm font-light">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}