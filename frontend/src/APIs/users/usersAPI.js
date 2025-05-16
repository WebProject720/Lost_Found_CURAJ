import axios from "axios";
import { SERVER_URL } from "../../constants.astro";


export const UserAPI = async (payload, path) => {
    try {
        const serverURL = SERVER_URL();
        const { data } = await axios.post(serverURL + path, payload, { withCredentials: true })
        return {
            status: true,
            data: data.data,
            msg: 'Request Succesfull'
        }
    } catch ({ response }) {
        // if(response.status==401) logoutUser();
        return {
            status: false,
            response,
            msg: "Server Error"
        }
    }
}

export const UserPostAPI = async (path, payload) => {
    try {
        const serverURL = SERVER_URL();
        const response = await axios.post(serverURL + '/users' + path, payload, { withCredentials: true })
        return response.data;
    } catch ({ response }) {
        return response.data;
    }
}