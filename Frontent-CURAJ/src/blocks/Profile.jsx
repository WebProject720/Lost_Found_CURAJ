import { useEffect, useState } from "react"
import { GET } from "../APIs/users/getreq"
import { getUser } from "../store";
import { Images } from "../constants.astro";
import { Line } from "../components/utility/Lline";
import { Complain } from "../components/Complain";
import { Loader } from "../components/utility/Loader";


export const UserProfile = ({ ...props }) => {
    const [complains, setComplains] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        (async function () {
            const { data } = await GET('/user');
            if (data) setComplains(data.complains);
            setUser(getUser());
        })()
    }, [])
    return (
        <div className="tablet:p-2  mt-4 desktop:p-4 flex flex-col justify-center items-center">
            {user &&
                <div className="flex bg-gray-200  w-full p-2  flex-col items-center justify-start gap-3">
                    <div>
                        <img className="size-16" sizes="50" src={Images.userIcon} alt="profile-image" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-fit">
                            <h1 className="text-center">{user.username}</h1>
                            <h1>{user.email}</h1>
                        </div>
                        <hr />
                        <div>
                            <p className="gap-2 ">
                                <span>Total Complains </span>
                                <span className="font-bold">
                                    {
                                        user.Reports.length
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            }
            <div className="w-screen p-2 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center">

                    <div className="w-1/2 my-5">
                        <Line></Line>
                    </div>
                    <h1 className="font-extrabold text-gray-700 text-4xl">
                        <center>
                            You'r Complains
                        </center>
                    </h1>
                    <div className="w-1/2 my-5">
                        <Line></Line>
                    </div>
                </div>
                <div className="desktop:w-2/3 tablet:w-full  p-2 min-h-48 flex flex-col gap-1">
                    {
                        complains ?
                            complains.map((c, key) => (
                                <Complain complain={c} key={key}></Complain>
                            ))
                            :
                            <div className="h-full flex items-center justify-center">
                                <Loader></Loader>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}