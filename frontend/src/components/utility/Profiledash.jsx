import { useState, useEffect } from "react";
import { getStoreData } from "../../store";
import { Images } from "../../constants.astro";

export const Profile = () => {
    const [store, setStore] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storeData = getStoreData();
        setStore(storeData);
        setUser(storeData.loggedUser);
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center  p-4 w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="relative mb-4 md:mb-0">
                <img
                    src={user?.profilePic || Images?.userIcon}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-sm object-cover"
                    alt="User Profile"
                />
            </div>
            <div className="flex flex-col text-center md:text-left md:ml-4">
                <h1 className="text-lg font-semibold text-gray-800">
                    {user?.username || "Username"}
                </h1>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
        </div>
    );
};
