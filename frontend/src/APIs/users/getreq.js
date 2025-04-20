import axios from "axios";
import { SERVER_URL } from "../../constants.astro";
import { logoutUser } from "../auth/logout";

export const GET = async (path, route = "/users") => {
    try {
        const serverURL = SERVER_URL();
        const { data } = await axios.get(serverURL + route + path, { withCredentials: true });

        return {
            status: true,
            data: data.data,
            msg: 'Request Succesfull'
        }
    } catch ({ response }) {
        if (response.status == 401)
            logoutUser();
        return {
            status: false,
            response,
            msg: "Server Error"
        }
    }
}