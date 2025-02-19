import { Images } from "../constants.astro";
import { Button } from "./utility/Button";
import { getStoreData } from "../store";
import { logoutUser } from "../APIs/auth/logout";
import { useEffect, useState } from "react";
import { Loader } from "./utility/Loader";


export const NavActions = (props) => {
  const [store, setStore] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, SetLoading] = useState(false);
  useEffect(() => {
    // if (typeof window !== undefined) {
    const storeData = getStoreData();
    setStore(storeData);
    setUser(storeData.loggedUser);
    // }
  }, [])

  const logout = () => {
    logoutUser();
    SetLoading(true);
  }

  return (
    <div className="font-bold">
      {
        !store?.isUserLogged || !store?.loggedUser ? (
          ""
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div className="">
              <Button onClick={logout}>
                {
                  loading ? <Loader></Loader> :
                    Logout
                }
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}