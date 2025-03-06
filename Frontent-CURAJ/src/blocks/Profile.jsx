import { useEffect, useState } from "react"
import { GET } from "../APIs/users/getreq"
import { getUser } from "../store";
import { Images } from "../constants.astro";
import { Complain } from "../components/Complain";
import { Loader } from "../components/utility/Loader";


export const UserProfile = ({ ...props }) => {
    const [complains, setComplains] = useState(null);
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null)
    useEffect(() => {
        (async function () {
            const { data } = await GET('/user');
            if (data) setComplains(data.complains);
            setUser(getUser());
        })()
    }, [])
    useEffect(() => {
        if (user)
            setUserDetails(
                {
                    username: user.username,
                    email: user.email,
                    Complaints: user.Reports.length,
                }
            )
    }, [user]);
    return (
        <div className="tablet:p-2  mt-4 desktop:p-4 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center bg-white/80 rounded-lg p-6 w-full md:w-3/4">
                <img
                    className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-xl"
                    src={Images.userIcon}
                    alt="profile"
                />
                <div className="desktop:w-1/2 flex flex-col gap-2 w-full py-3">
                    {
                        userDetails && Object.entries(userDetails).map(([value, key], i) => (
                            <div className="flex gap-0 w-full" key={i}>
                                <div className=" border-[1px] p-2 w-1/4 rounded-md rounded-r-none border-black bg-gray-200">
                                    <p>{value}</p>
                                </div>
                                <div className="  border-[1px] p-2 rounded-md rounded-l-none border-l-0 w-3/4 border-black bg-gray-100">
                                    <h1>
                                        {key}
                                    </h1>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w-screen p-2 flex flex-col justify-center items-center ">
                <div className="flex flex-col items-center justify-center w-full">


                    <h1 className="font-extrabold text-gray-700 text-3xl">
                        <center>
                            My Complains
                        </center>
                    </h1>
                    <div className="w-1/2 my-5">
                        <hr className="border-0 h-1 bg-gradient-to-r from-green-500 via-purple-500 to-green-500 rounded-full" />
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
        </div >
    )
}