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
            console.log(getUser());

        })()
    }, [])
    useEffect(() => {
        if (user)
            setUserDetails(
                {
                    Username: user.username,
                    Email: user.email,
                    Complaints: user.Reports.length,
                    'Account Created': new Date(user.createdAt).toDateString(),
                }
            )
    }, [user]);
    return (
        <div className="tablet:p-2  mt-4 desktop:p-4 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full md:w-3/4 lg:w-1/2">
                <img
                    className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
                    src={Images.userIcon}
                    alt="profile"
                />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{user?.username}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <div className="w-full mt-6">
                    {userDetails && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(userDetails).map(([label, value], i) => (
                                <div
                                    key={i}
                                    className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <p className="text-sm text-gray-500">{label}</p>
                                    <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-screen p-2 flex flex-col justify-center items-center ">
                <div className="flex desktop:my-10 phone:my-4 flex-col items-center justify-center w-full">
                    <h1 className="font-extrabold font-serif text-gray-700 text-3xl">
                        <center>
                            My Complaints
                        </center>
                    </h1>
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