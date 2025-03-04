import { useEffect, useState } from "react"
import { ReportsGetRequests } from "../APIs/reports/reportsAPI"
import { Images } from "../constants.astro"
import { Loader } from "../components/utility/Loader"
import { Complain } from "../components/Complain"
import { Button } from "../components/utility/Button"
import { Input } from "../components/utility/Input"


export const Complains = ({ ...props }) => {

    const [search, setSearch] = useState(null);
    const [data, setData] = useState(null);
    let [complains, setComplains] = useState(null);
    let [status, setStatus] = useState(2)//1: true/success , 0 : false/error , 2 : loading ,3:No data
    useEffect(() => {
        (async () => {
            const complains = await ReportsGetRequests("/getall");
            if (complains.data) {
                setData(complains.data);
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


    useEffect(() => {
        console.log(complains, search);
        if (complains && search) {
            console.log(complains);
            const filterComplains = data.filter((complain) => {
                return complain.title.toLowerCase().includes(search.toLowerCase()) ? complain : null
            })
            console.log(data, filterComplains);
            if (filterComplains.length <= 0) setStatus(3);
            setComplains(filterComplains);
        } else {
            setComplains(data)
        }

    }, [search, setSearch])




    if (status == 2) {
        return (
            <div className="min-h-screen flex items-center justify-center w-full">
                <Loader></Loader>
            </div>
        )
    }
    if (status == 3) {
        return (
            <div className="min-h-screen flex items-center justify-center w-screen">
                <h1 className="text-4xl text-gray-400 font-extrabold ">
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
        <div className="bg-white-200 inset-0 w-full overflow-auto flex justify-center">
            <div className="bg-white p-5 rounded-lg max-w-7xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                    <select
                        className="border p-2 rounded bg-gray-50 focus:ring-cyan-100"
                    >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                    </select>
                </div>
                <div className="flex flex-col min-h-80 justify-start gap-2">
                    {complains && complains.map((complain, key) => (
                        <Complain complain={complain} key={key}></Complain>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 pb-4">
                    <Button className="">Previous</Button>
                    <Button className="">Next</Button>
                </div>
            </div>
        </div>

    )
}