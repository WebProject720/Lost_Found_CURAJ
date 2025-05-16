import axios from "axios"
import { ShowAlert } from "../../components/alertLogic";
import { SERVER_URL } from "../../constants.astro";
import { logout } from "../../store";

//post requests

const server = SERVER_URL();
export const AdminPostAPIs = async (route, data) => {
    try {
        const response = await axios.post(server + '/admin' + route, data, { withCredentials: true });
        return response.data;

    } catch ({ response }) {
        ShowAlert(response?.data?.message||"Something went wrong", false);
        if(response?.status==401)
            // logout();
        return response.data;
    }
}

export const AdminGetAPIs = async (route) => {
    try {
        const response = await axios.get(server + '/admin' + route, { withCredentials: true });

        return response.data;
    } catch ({ response }) {
        ShowAlert(response?.data?.message || "Something went wrong", false);
        if(response?.status==401)
            logout();
        return response.data
    }
}
export const checkAdminExist = async () => {
    try {
        const response = await axios.post(server + '/admin/islogged',null, { withCredentials: true });
        return response.data;
    } catch ({ response }) {
        if(response?.status==401)
            logout();
        return response.data
    }
}

export const adminLogout = async () => {
    try {
        const response = await axios.get(server + '/admin/logout', { withCredentials: true });
        // logout();
        // return response.data;
    } catch ({ response }) {
        ShowAlert(response?.data?.message || "Something went wrong", false);
        logout();
        return response.data;
    }
}