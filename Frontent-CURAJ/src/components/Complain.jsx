import { useEffect, useState } from "react";
import { Images } from "../constants.astro";
import { getUser } from "../store";
import { Button } from "./utility/Button";
import { ReportsAPIs } from "../APIs/reports/reportsAPI";
import { Loader } from "./utility/Loader";


export const Complain = ({ ...props }) => {
    const [complain, setComplain] = useState(null);
    const [isOwner, setOwner] = useState(false);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        (function () {
            const user = getUser();
            if (user._id == props.complain.userID && !props.complain.userDetails) {
                setOwner(true);
                props.complain.userDetails = user;
            }
            setComplain(props.complain);
        })();
    }, [])
    const chnageStatus = async () => {
        setLoading(true);
        const res = await ReportsAPIs('/changeStatus', { id: complain._id, changeTo: !complain.isOpen });
        console.log(res);
        setLoading(false);
    }
    return (
        complain &&
        <div className="bg-white p-4 min-h-fit flex flex-col gap-2 shadow rounded-lg border border-gray-200">
            <div key={complain._id} className=" flex items-center gap-4 ">
                <img
                    src={Images.userIcon}
                    alt="User"
                    className={`w-12 h-12 rounded-full border-[1px] ${!complain?.isOpen ? 'border-red-500' : 'border-green-500'} `}
                />
                <a href={`/dashboard/reports/report/id?id=${complain._id}`} className="flex-1 overflow-hidden">
                    <div className="flex gap-2 tablet:gap-1 flex-wrap items-center justify-between">
                        <h3 className="text-lg font-semibold">{complain.userDetails.username}</h3>
                        <p className="text-xs text-gray-400">{new Date(complain.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-row relative items-center gap-1">
                        <div className="group cursor-pointer">
                            <div className={`red-dot  size-3 ${!complain?.isOpen ? 'bg-red-600' : 'bg-green-500'} rounded-full`}>
                            </div>
                            <div className="hidden top-0 left-5 absolute group-hover:flex bg-gray-700 text-white p-2 rounded-md">
                                <p>
                                    <b>{complain?.isOpen ? 'Open' : 'Closed'}</b>
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600 font-medium text-nowrap truncate overflow-hidden">{complain.title}</p>
                    </div>
                    <p className="text-gray-500 text-sm truncate overflow-hidden">{complain.description}</p>
                </a>
                <a className="tablet:hidden" href={`/dashboard/reports/report/id?id=${complain._id}`} title="Reply">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/481/481675.png"
                        alt="Reply Icon"
                        className="w-6 h-6"
                    />
                </a>
            </div >
            {isOwner &&
                <div className="w-full flex flex-col justify-end gap-1">
                    <hr className="w-full my-2" />
                    <div className="flex justify-end gap-1">
                        <div>
                            <Button onClick={() => { chnageStatus() }} type="submit" disabled={isLoading}>
                                {
                                    isLoading ?
                                        <Loader></Loader>
                                        :
                                        complain.isOpen ? 'Set Closed' : 'Set Open'
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}