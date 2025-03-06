import { Button } from "./utility/Button";
import { logoutUser } from "../APIs/auth/logout";
import { useEffect, useState } from "react";
import { Loader } from "./utility/Loader";
import { Link } from "./utility/Link";
import { Images } from "../constants.astro";
import { getStoreData } from "../store";

export const AdminAction = () => {
  const [Icons, setIcons] = useState(Images);
  const [store, setStore] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeData = getStoreData();
    setStore(storeData);
    setUser(storeData?.loggedUser);
  }, []);

  const logout = () => {
    setLoading(true);
    logoutUser();
  };

  const actions = [
    { name: "Dashboard", route: "/admin", icon: Icons.dashboardIcon || null },
    { name: "Complains", route: "/admin/complains", icon: Icons.AddReportIcon || null },
    { name: "Users", route: "/admin/users", icon: Icons.AddReportIcon || null },
    { name: "Admin Profile", route: "/dashboard/userprofile", icon: Icons.userIcon || null }
  ];

  return (
    <div className="font-bold">
      {store?.isUserLogged && user ? (
        <div className="flex items-center tablet:flex-col tablet:items-start align-middle justify-center gap-2">
          <div className="flex gap-1 tablet:w-full tablet:items-start tablet:flex-col items-center justify-center">
            {actions.map((action, index) => (
              <Link key={index} icon={action.icon} name={action.name} href={action.route}>
                {action.name}
              </Link>
            ))}
          </div>
          <div className="border-l-[1px] tablet:w-full flex tablet:items-center tablet:justify-center tablet:border-l-0 tablet:border-t-[1px] tablet:pl-0 tablet:pt-2 border-black pl-2">
            <Button onClick={logout} disabled={loading}>
              {loading ? <Loader /> : "Logout"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
