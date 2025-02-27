import { useState } from "react";

const StatsDashboard = () => {
  const [stats] = useState({
    totalUsers: 500,
    openComplaints: 120,
    closedComplaints: 380,
    todayComplaints: 25
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-600" />
        <StatCard title="Open Complaints" value={stats.openComplaints} color="bg-red-600" />
        <StatCard title="Closed Complaints" value={stats.closedComplaints} color="bg-green-600" />
        <StatCard title="Today's Complaints" value={stats.todayComplaints} color="bg-yellow-500" />
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
