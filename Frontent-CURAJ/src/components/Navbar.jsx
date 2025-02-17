import { Images } from "../constants.astro";
import { Button } from "./utility/Button";
import { getStoreData } from "../store";
import { logoutUser } from "../APIs/auth/logout";




export default function Navbar() {
    const store = getStoreData();

    if (!store.isUserLogged || !store.loggedUser) return;
    const user = store.loggedUser;
    console.log(user);


    return (
        <div className="flex items-center justify-center gap-2">
            <div className="">
                <Button onClick={logoutUser}>Logout</Button>
            </div>
            <div className="flex flex-row cursor-pointer group gap-2 items-center justify-center bg-gray-200 p-2 rounded-md">
                <div>
                    <img src={Images.userIcon} className="w-20"></img>
                </div>
                <div className="flex flex-col items-start gap-0">
                    <h1>
                        <center>
                            {
                                user?.username || "Username"
                            }
                        </center>
                    </h1>
                    <p className="text-sm font-light">
                        {user?.email || ''}
                    </p>
                </div>
            </div>

        </div>
    )
}