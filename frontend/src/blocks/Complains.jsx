import {  useEffect, useState } from "react";
import { ReportsGetRequests } from "../APIs/reports/reportsAPI";
import { Loader } from "../components/utility/Loader";
import { Complain } from "../components/Complain";
import { Button } from "../components/utility/Button";
import { Input } from "../components/utility/Input";

export const Complains = ({ ...props }) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [filteredComplains, setFilteredComplains] = useState([]);
    const [status, setStatus] = useState(2); // 1: success, 0: error, 2: loading, 3: no data

    // Fetch data on component mount
    useEffect(() => {
        (async () => {
            try {
                setStatus(2);
                const response = await ReportsGetRequests("/getall");
                if (response.data) {
                    setData(response.data);
                    setFilteredComplains(response.data);
                    console.log(response.data);
                    setStatus(response.data?.length > 0 ? 1 : 2);
                } else {
                    setStatus(0);
                }
            } catch (error) {
                console.error("Error fetching complains:", error);
                setStatus(0);
            }
        })();
    }, []);

    // Debounced search mechanism
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim()) {
                setFilteredComplains(data.filter((complain) =>
                    complain.title.toLowerCase().includes(search.toLowerCase())
                ));
            } else {
                setFilteredComplains(data);
                setStatus(data.length > 0 ? 1 : 3);
            }
        }, 300); // 300ms debounce time
        return () => clearTimeout(timeoutId);
    }, [search, data]);


    // Render loading state
    if (status === 2) {
        return (
            <div className="min-h-screen flex items-center justify-center w-full">
                <Loader />
            </div>
        );
    }

    // Render no data state
    if (status === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center w-screen">
                <h1 className="text-4xl text-gray-400 font-extrabold">
                    <center>No Reports Found !!</center>
                </h1>
            </div>
        );
    }

    // Render error state
    if (status === 0) {
        return (
            <div>
                <h1>
                    <center>Something went Wrong !!</center>
                </h1>
            </div>
        );
    }

    // Render main content
    return (
        <div className="bg-white-200 inset-0 w-full overflow-auto flex justify-center">
            <div className="bg-white p-5 rounded-lg max-w-7xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        value={search}
                    />
                    <select className="border p-2 rounded bg-gray-50 focus:ring-cyan-100">
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                    </select>
                </div>
                <div className="flex flex-col min-h-80 justify-start gap-2">
                    {
                        filteredComplains.map((complain) => (
                            <Complain complain={complain} key={complain._id} />
                        ))
                    }
                </div>
                <div className="flex justify-between items-center mt-4 pb-4">
                    <Button>Previous</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </div>
    );
};