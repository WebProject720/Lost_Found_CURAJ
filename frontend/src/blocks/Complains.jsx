import { useEffect, useState } from "react";
import { ReportsGetRequests } from "../APIs/reports/reportsAPI";
import { Loader } from "../components/utility/Loader";
import { Complain } from "../components/Complain";
import { Input } from "../components/utility/Input";
import { ShowAlert } from "../components/alertLogic";

export const Complains = ({ ...props }) => {
  const [search, setSearch] = useState("");
  const [filterOption, setFilterOption] = useState("all"); // Default filter option
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
          setStatus(response.data?.length > 0 ? 1 : 3);
        } else {
          setStatus(0);
        }
      } catch (error) {
        console.error("Error fetching complains:", error);
        setStatus(0);
      }
    })();
  }, []);

  // Debounced search mechanism with filter logic
  useEffect(() => {
    (() => {
      if (!search) {
        setFilteredComplains(data);
        return;
      }
      const timeoutId = setTimeout(() => {
        const filtered = data.filter((complain) => {
          const searchLower = search.toLowerCase();
          if (filterOption === "all") {
            return (
              complain.title.toLowerCase().includes(searchLower) ||
              complain.description.toLowerCase().includes(searchLower)
            );
          } else if (filterOption === "title") {
            return complain.title.toLowerCase().includes(searchLower);
          } else if (filterOption === "description") {
            return complain.description.toLowerCase().includes(searchLower);
          }
          return false;
        });
        setFilteredComplains(filtered);
      }, 300); // 300ms debounce time
      setStatus(filteredComplains.length > 0 ? 1 : 3);
      return () => clearTimeout(timeoutId);
    })();
  }, [search, filterOption, data]);

  // Render loading state
  if (status === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loader />
      </div>
    );
  } else if (status === 3) {
    ShowAlert("No Compaints found", false);
    return (
      <div className="min-h-screen flex items-center justify-center w-screen">
        <h1 className="text-4xl text-gray-400 font-extrabold">
          <center>No Complaint Found !!</center>
        </h1>
      </div>
    );
  } else if (status === 0) {
    ShowAlert("Something went wrong", false);
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
        <div className="flex  justify-start phone:items-stretch gap-2 items-center my-4  tablet:my-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            value={search}
            className="!w-full bg-transparent"
          />
          <select
            id="search-filter"
            className="bg-gray-100 border-gray-400 outline-none border-[1px] 
                    rounded-md p-2  
                    focus:bg-gray-200 focus:border-blue-800 focus:shadow-md focus:shadow-blue-200
                    transition-all duration-500 phone:p-1 bg-transparent"
            onChange={(e) => setFilterOption(e.target.value)} // Update filter option
          >
            <option value="all">All</option>
            <option value="title">Subject</option>
            <option value="description">Description</option>
          </select>
        </div>
        <div className="flex flex-col min-h-80 justify-start py-3 gap-2">
          {filteredComplains.map((complain) => (
            <Complain complain={complain} key={complain._id} />
          ))}
        </div>

        <hr className="mt-5" />
        <p className="text-center text-gray-400  text-xs p-2">
          Recent 30 Complaints
        </p>

      </div>
    </div>
  );
};
