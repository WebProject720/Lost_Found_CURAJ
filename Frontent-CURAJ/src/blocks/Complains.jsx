import { useEffect, useState } from "react"
import { ReportsGetRequests } from "../APIs/reports/reportsAPI"
import { Images } from "../constants.astro"
import { Loader } from "../components/utility/Loader"
import { Complain } from "../components/Complain"


export const Complains = ({ ...props }) => {
    let [complains, setComplains] = useState(null);
    let [status, setStatus] = useState(2)//1: true/success , 0 : false/error , 2 : loading ,3:No data
    useEffect(() => {
        (async () => {
            const complains = await ReportsGetRequests("/getall");
            if (complains.data) {
                setComplains(complains.data);
                if (complains.data.length <= 0)
                    setStatus(3)
                else
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
    if (status == 3) {
        return (
            <div>
                <h1 className="text-4xl text-gray-400 font-extrabold">
                    <center>
                        No Reports Found !!
                    </center>
                </h1>
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
            <Complain complain={complain} key={key}></Complain>
        ))

    )
}