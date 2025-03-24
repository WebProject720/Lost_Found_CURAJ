import { useEffect, useState } from "react";
import { GET } from "../../APIs/users/getreq";
import { setStats as setStatsDB, getStats } from "../../store";

const StatsDashboard = () => {
  const [stats, setStats] = useState({
    closedComplains: 0,
    openedComplains: 0,
    todaysComplains: 0,
    totalComplains: 0,
    usersCount: 0
  });

  useEffect(() => {
    (() => {
      const stats = getStats();
      setStats(stats);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await GET("/stats", "/reports");
      if (data) {
        setStats(data);
        setStatsDB(data);
      }
    })();
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.usersCount || 0} color="bg-blue-600" />
        <StatCard title="Open Complaints" value={stats.closedComplains || 0} color="bg-red-600" />
        <StatCard title="Closed Complaints" value={stats.closedComplains || 0} color="bg-green-600" />
        <StatCard title="Today's Complaints" value={stats.todaysComplains || 0} color="bg-yellow-500" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`p-5 rounded-xl border border-gray-300 shadow-lg ${color} bg-opacity-90 text-white`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatsDashboard;
