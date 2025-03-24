import axios from "axios";

export const UserAPI = async (payload, path) => {
    const route = "/users";
    try {
        const PRODUCTION = import.meta.env.PUBLIC_PRODUCTION == "true";
        const serverURL = Boolean(PRODUCTION)
            ? import.meta.env.PUBLIC_PRODUCTION_SERVER + route || null
            : "http://localhost:5000" + route;
        const { data } = await axios.post(serverURL + path, payload, { withCredentials: true })
        return {
            status: true,
            data: data.data,
            msg: 'Request Succesfull'
        }
    } catch (error) {
        return {
            status: false,
            error,
            msg: "Server Error"
        }
    }
}