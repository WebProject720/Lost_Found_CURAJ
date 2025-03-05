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
            {user && (
          <div className="flex flex-col items-center bg-white/80 rounded-lg p-6 w-full md:w-3/4">
            <img
              className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-xl"
              src={Images.userIcon}
              alt="profile"
            />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              {user.username}
            </h1>
            <h2 className="text-base text-gray-600 mt-2">{user.email}</h2>
            <div className="mt-4 flex items-center font-bold text-blue-700 text-base">
              <span>Total Complains: </span>
              <span className="font-bold text-green-800 text-lg ml-2">{user.Reports.length}</span>
            </div>
          </div>
        )}
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
        </div>
    )
}