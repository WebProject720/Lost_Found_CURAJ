import { useState } from "react";

const StatsDashboard = () => {
  // Dummy data (Can be replaced with API calls)
  const [stats, setStats] = useState({
    totalUsers: 500,
    openComplaints: 120,
    closedComplaints: 380,
    todayComplaints: 25,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-500" />
      <StatCard title="Open Complaints" value={stats.openComplaints} color="bg-red-500" />
      <StatCard title="Closed Complaints" value={stats.closedComplaints} color="bg-green-500" />
      <StatCard title="Today's Complaints" value={stats.todayComplaints} color="bg-yellow-500" />
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg text-white ${color}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatsDashboard;
