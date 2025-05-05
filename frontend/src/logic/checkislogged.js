import { navigate } from "astro:transitions/client";
import { setUserLogin, setUserInfo, logout, getStoreData } from "../store";
import { adminLogout, checkAdminExist } from "../APIs/admin/adminAPIs";
import { UserAPI } from "../APIs/users/usersAPI";
import { ShowAlert } from "../components/alertLogic";

// logout user if cookie  not exist
export const isUserCookieExist = async () => {
    const user = getStoreData();

    let loaderDiv = document.getElementById("loader-container");
    let container = document.getElementById("container");

    if (!user.isUserLogged || !user.loggedUser) {
        navigate("/auth");
        container?.classList.add("hidden");
        loaderDiv?.classList.add("flex");
        UserAPI(null, "/getuser")
            .then((res) => {
                if (res.status) {
                    setUserLogin(true);
                    setUserInfo(res.data);
                    container?.classList.remove("hidden");
                    loaderDiv?.classList.add("hidden");
                } else {
                    logout();
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
                logout();
                navigate("/");
            });
    }

}
// logout admin if cookie not exist
// check is DB request
export const isAdminCookieExist = async () => {
    const user = getStoreData();

    let loaderDiv = document.getElementById("loader-container");
    let container = document.getElementById("container");


    if (!user.isUserLogged || !user.loggedUser) {
        // navigate("/auth?mode=0");
        console.log('checking for admin cookie...');

        // container?.classList.add("hidden");
        // loaderDiv?.classList.add("flex");
        checkAdminExist("/islogged")
            .then((res) => {
                console.log(res);
                if (res?.success) {
                    setUserLogin(true);
                    setUserInfo(res.data, true);
                    navigate('/admin');
                } else {
                    container?.classList.remove("hidden");
                    loaderDiv?.classList.add("hidden");
                }
            })
            .catch((error) => {
                console.log(error);
                container?.classList.remove("hidden");
                loaderDiv?.classList.add("hidden");
                ShowAlert(error?.response?.message || ' Something went wrong', false)
            });
    }
}

export const isAdminExists = async () => {
    const store = getStoreData();
    if (!store.isAdmin && !store.loggedUser) adminLogout();
}