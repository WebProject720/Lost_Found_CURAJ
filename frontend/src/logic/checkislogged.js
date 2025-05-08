import { navigate } from "astro:transitions/client";
import { setUserLogin, setUserInfo, logout, getStoreData, get_session, update_session, earse } from "../store";
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

        container?.classList.add("hidden");
        loaderDiv?.classList.add("flex");
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




// check for both's cookie at open or after a time period
export const checkCookies = async () => {
    const response={
        user:false,
        admin:false,
        ischeck:false
    }
    const data = get_session();
    if (data.isCookiesChecked) return response;
    response.ischeck=true;

    data.isCookiesChecked = true;


    console.log('Checking cookies for user and admin in parallel...');

    try {
        //run both apis in parallel order
        const [userResponse, adminResponse] = await Promise.all([
            UserAPI(null, "/getuser"),
            checkAdminExist("/islogged"),
        ]);

        // Handle user response
        if (userResponse.status === 200) {
            setUserLogin(true);
            setUserInfo(userResponse.data);
            response.user=true;
        } else {
            throw new Error('Invalid user response status');
        }

        // Handle admin response
        if (adminResponse?.status === 200 && adminResponse?.success) {
            setUserLogin(true);
            setUserInfo(adminResponse.data, true);
            response.admin=true;
        } else {
            throw new Error('Invalid admin response status or unsuccessful response');
        }
    } catch (error) {
        console.log(error);
        earse();
    }

    update_session(data);
    return response;
};