import { Button } from "./utility/Button";
import { logoutUser } from "../APIs/auth/logout";
import { useEffect, useState } from "react";
import { Loader } from "./utility/Loader";
import { Link } from "./utility/Link";
import { getStoreData } from "../store";
import { confirmBox } from "./alertLogic.ts";
import { AdminNavigationRoutes, UserNavigationRoutes } from "../constants.astro";
import { adminLogout } from "../APIs/admin/adminAPIs.js";

export const NavActions = (props) => {
  const [actions, setactions] = useState([]);


  const [store, setStore] = useState(null);
  const [user, setUser] = useState(null);

  //set by default navigation routes with store 'isAdmin' 
  useEffect(() => {
    const NavigationRoutes = store?.isAdmin ? AdminNavigationRoutes : UserNavigationRoutes || props.route;
    setactions(NavigationRoutes);
  }, [store, user])


  useEffect(() => {
    const storeData = getStoreData();
    setStore(storeData);
    setUser(storeData.loggedUser);
  }, [])

  const [loading, SetLoading] = useState(false);
  useEffect(() => {
    const storeData = getStoreData();
    setStore(storeData);
    setUser(storeData.loggedUser);
  }, [])

  const logout = async () => {
    const islogout = await confirmBox('Sure want to Logout');
    if (!islogout) return;
    SetLoading(true);
    (async () => {
      store.isAdmin ? adminLogout() : logoutUser();
    })();
    SetLoading(false);
  }

  return (
    <div className="font-bold">
      {
        !store?.isUserLogged || !store?.loggedUser ? (
          ""
        ) : (
          <div className="flex items-center tablet:flex-col tablet:items-start align-middle justify-center gap-2">
            <div className="flex gap-1 tablet:w-full tablet:items-start tablet:flex-col items-center justify-center">
              {
                actions && actions.map((action, index) => (
                  <Link key={index} icon={action.icon || null} name={action.name} href={action.route} >
                    {action.name}
                  </Link>
                ))
              }
            </div>
            <div className="border-l-[1px] tablet:w-full flex tablet:items-center tablet:justify-center tablet:border-l-0 tablet:border-t-[1px] tablet:pl-0 tablet:pt-2 border-black pl-2">
              <Button onClick={logout} disabled={loading}>
                {
                  loading ? <Loader></Loader> :
                    "Logout"
                }
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}