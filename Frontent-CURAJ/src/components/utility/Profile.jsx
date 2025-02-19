import { useState, useEffect } from "react";
import { getStoreData } from "../../store"
import { Images } from "../../constants.astro";


export const Profile = () => {
    const [store, setStore] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storeData = getStoreData();
        setStore(storeData);
        setUser(storeData.loggedUser);
        console.log(storeData.loggedUser);

    }, [])
    return (
        <div className="flex flex-row items-center  bg-gray-100 rounded-md p-2">
            <div className="flex flex-row cursor-pointer group gap-2 items-center justify-center bg-transparent p-2 rounded-md">
                <div>
                    <img
                        src={Images?.userIcon}
                        className="desktop:w-10 w-20"
                    />
                </div>
            </div>
            <div className="flex flex-col items-start gap-0">
                <h1>
                    <center>{user?.username || "Username"}</center>
                </h1>
                <p className="text-sm font-light">{user?.email || ""}</p>
            </div>
        </div>
    )
}