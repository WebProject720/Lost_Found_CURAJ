import { navigate } from "astro:transitions/client";
import { getStoreData, logout } from "../../store";
import { UserAPI } from "../users/usersAPI";


const store = getStoreData();
const user = store.loggedUser;

export const logoutUser = async () => {
    await UserAPI({ _id: user?._id }, '/users/logout').then((res) => {
        logout();
        navigate('/');
    }).catch((err) => {
        console.log(err);
    })
}