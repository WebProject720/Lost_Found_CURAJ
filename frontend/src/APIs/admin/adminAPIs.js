import axios from "axios"
import { ShowAlert } from "../../components/alertLogic";
import {  SERVER_URL } from "../../constants.astro";

//post requests

const server=SERVER_URL();
export const AdminPostAPIs = async (route, data) => {
    try {
        const  response  = await axios.post(server+'/admin' + route, data,{withCredentials:true});
        return response.data;

    } catch ({ response }) {
        console.log(response);
        ShowAlert("Something went wrong", false);
    }
}

export const AdminGetAPIs = async (route) => {
    try {
        const  response  = await axios.get(server+'/admin' + route,{withCredentials:true});
        return response.data;
    } catch ({response} ) {
        ShowAlert(response?.data?.message||"Something went wrong", false);
    }
}