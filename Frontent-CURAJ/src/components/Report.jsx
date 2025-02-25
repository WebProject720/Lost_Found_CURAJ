'use client'
import { useEffect, useState } from "react"
import { ReportsGetRequests } from "../APIs/reports/reportsAPI";
import { Images } from "../constants.astro";

export const Reports = async (...props) => {

    const [reports, setReports] = useState(null);
    useEffect(() => {
        (async function () {
            const FetchReports = await ReportsGetRequests('/getall');
            if(FetchReports.data){
                setReports(FetchReports.data);
            }
        })();
    }, [])


    return (
        <div className="space-y-4" id="">
            {reports && reports.map((report,key) => (
                <div key={key} className="bg-white p-4 min-h-screen shadow rounded-lg flex items-center gap-4 border border-gray-200">
                    <img
                        src={Images.userIcon}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 overflow-hidden">
                        <div className="flex gap-2 flex-wrap items-center justify-between">
                            <h3 className="text-lg font-semibold">{report.username}</h3>
                            <p className="text-xs text-gray-400">{report.createdAt}</p>
                        </div>
                        <p className="text-gray-600 font-medium">{report.title}</p>
                        <p className="text-gray-500 text-sm truncate overflow-hidden">{report.description}</p>
                    </div>
                    <a href="#" title="Reply">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/481/481675.png"
                            alt="Reply Icon"
                            className="w-6 h-6"
                        />
                    </a>
                </div>
            ))}
        </div>
    )
}