import { useEffect, useState } from "react"
import { ReportsGetRequests } from "../APIs/reports/reportsAPI"
import { Images } from "../constants.astro"
import { Loader } from "../components/utility/Loader"


export const Complains = ({ ...props }) => {
    let [complains, setComplains] = useState(null);
    let [status, setStatus] = useState(2)//1: true/success , 0 : false/error , 2 : loading 
    useEffect(() => {
        (async () => {
            const complains = await ReportsGetRequests("/getall");
            if (complains.data) {
                setComplains(complains.data);
                setStatus(1);
            } else {
                setStatus(0);
            }
        })();
    }, [])
    if (status == 2) {
        return (
            <div>
                <Loader></Loader>
            </div>
        )
    }
    if (status == 0) {
        return (
            < div >
                <h1>
                    <center>
                        Something went Wrong !!
                    </center>
                </h1>
            </div>
        )
    }
    return (
        complains && complains.map((complain, key) => (
            <div key={key} className="bg-white p-4 min-h-fit shadow rounded-lg flex items-center gap-4 border border-gray-200">
                <img
                    src={Images.userIcon}
                    alt="User"
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 overflow-hidden">
                    <div className="flex gap-2 flex-wrap items-center justify-between">
                        <h3 className="text-lg font-semibold">{complain.userDetails.username}</h3>
                        <p className="text-xs text-gray-400">{new Date(complain.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-row relative items-center gap-1">
                        <div className="group cursor-pointer">
                            <div className="red-dot  size-3  bg-red-800 rounded-full">
                            </div>
                            <div className="hidden top-0 left-5 absolute group-hover:flex bg-gray-700 text-white p-2 rounded-md">
                                <p>
                                    <b>Closed</b>
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600 font-medium">{complain.title}</p>
                    </div>
                    <p className="text-gray-500 text-sm truncate overflow-hidden">{complain.description}</p>
                </div>
                <a href={`/dashboard/reports/report/id/?id=${complain._id}`} title="Reply">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/481/481675.png"
                        alt="Reply Icon"
                        className="w-6 h-6"
                    />
                </a>
            </div >
        ))

    )
}