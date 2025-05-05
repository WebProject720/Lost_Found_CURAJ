import axios from "axios";
import { SERVER_URL } from "../../constants.astro";
import { logoutUser } from "../auth/logout";
import { ShowAlert } from "../../components/alertLogic";

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
        console.log(response);
        ShowAlert(response?.message||"Something went wrong",false)
        if (!response.success)
            // logoutUser();
        return {
            status: false,
            response,
            msg: "Server Error"
        }
    }
}