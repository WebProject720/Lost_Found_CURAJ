import { getStoreData } from "../store"




export default function Navbar() {
    const store = getStoreData();
    console.log(store);

    if (!store.isUserLogged) return;
    const user = store.loggedUser;
    console.log(user);


    return (
        <div>
            <div>
                <h1>
                    <center>
                        {
                            user.username || "Username"
                        }
                    </center>
                </h1>
            </div>
        </div>
    )
}