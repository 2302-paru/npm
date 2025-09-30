import React, { useState } from "react";
import { Crown, Medal, Flame } from "lucide-react";
// --- MOCK DATA ---
const leaderboardData = {
  Weekly: [
    {
      id: 1,
      name: "Aarav Sharma",
      points: 300,
      streak: 7,
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Ishita Patel",
      points: 280,
      streak: 6,
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Rohan Verma",
      points: 250,
      streak: 5,
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Meera Nair",
      points: 220,
      streak: 4,
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 15,
      name: "Saanvi Joshi (You)",
      points: 180,
      streak: 3,
      avatar: "https://i.pravatar.cc/150?u=15",
    },
  ],
  Monthly: [
    {
      id: 1,
      name: "Aarav Sharma",
      points: 850,
      streak: 12,
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Ishita Patel",
      points: 820,
      streak: 11,
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Meera Nair",
      points: 790,
      streak: 9,
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 4,
      name: "Rohan Verma",
      points: 720,
      streak: 8,
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 15,
      name: "Saanvi Joshi (You)",
      points: 600,
      streak: 6,
      avatar: "https://i.pravatar.cc/150?u=15",
    },
  ],
  "All Time": [
    {
      id: 1,
      name: "Aarav Sharma",
      points: 1200,
      streak: 15,
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Ishita Patel",
      points: 1100,
      streak: 12,
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Rohan Verma",
      points: 980,
      streak: 10,
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Meera Nair",
      points: 940,
      streak: 8,
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 5,
      name: "Devansh Rao",
      points: 900,
      streak: 7,
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    {
      id: 15,
      name: "Saanvi Joshi (You)",
      points: 710,
      streak: 3,
      avatar: "https://i.pravatar.cc/150?u=15",
    },
  ],
};

const CURRENT_USER_ID = 15;

// --- COMPONENTS ---
const PodiumItem = ({ user, rank, isCurrentUser }) => {
  const styles = {
    1: {
      icon: <Crown size={32} className="text-yellow-400" />,
      borderColor: "border-yellow-400",
      bgColor: "bg-yellow-400/10",
      textColor: "text-yellow-300",
      order: "sm:order-2",
      height: "sm:h-48 h-auto",
      shadow: "shadow-yellow-400/20",
    },
    2: {
      icon: <Medal size={28} className="text-gray-300" />,
      borderColor: "border-gray-400",
      bgColor: "bg-gray-400/10",
      textColor: "text-gray-200",
      order: "sm:order-1",
      height: "sm:h-40 h-auto",
      shadow: "shadow-gray-400/20",
    },
    3: {
      icon: <Medal size={28} className="text-orange-400" />,
      borderColor: "border-orange-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-300",
      order: "sm:order-3",
      height: "sm:h-40 h-auto",
      shadow: "shadow-orange-500/20",
    },
  };

  const style = styles[rank];
  const highlightClass = isCurrentUser
    ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900"
    : "";
  const rankOneMobileClass = rank === 1 ? "py-6 px-4 -my-4 z-10" : "p-4";

  return (
    <div
      className={`flex flex-col items-center justify-end rounded-xl border-b-4 shadow-lg transition-all duration-300 ${style.height} ${style.borderColor} ${style.bgColor} ${style.order} ${style.shadow} ${rankOneMobileClass}`}
    >
      <div className="flex sm:flex-col items-center text-center w-full">
        {style.icon}
        <img
          src={user.avatar}
          alt={user.name}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-500 mx-4 sm:my-2 ${highlightClass}`}
        />
        <div className="flex-grow text-left sm:text-center">
          <p className="font-bold text-white text-md">{user.name}</p>
          <p className={`font-semibold text-lg ${style.textColor}`}>
            {user.points} pts
          </p>
        </div>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ user, rank, isCurrentUser }) => {
  const highlightClass = isCurrentUser
    ? "bg-purple-600/20 border-purple-500"
    : "bg-gray-800/40 border-gray-700";

  return (
    <div
      className={`flex items-center p-3 space-x-2 rounded-lg hover:bg-gray-700/60 transition-colors duration-200 border ${highlightClass}`}
    >
      <span className="text-base font-bold text-gray-400 w-8 text-center">
        {rank}
      </span>
      <img
        src={user.avatar}
        alt={user.name}
        className="w-10 h-10 rounded-full"
      />
      <p className="flex-grow font-semibold text-white text-sm truncate">
        {user.name}
      </p>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
          {user.points} pts
        </span>
        <div className="hidden sm:flex items-center space-x-1 text-orange-400 bg-gray-700 px-3 py-1 rounded-full">
          <Flame size={16} />
          <span className="font-medium text-sm">{user.streak}d</span>
        </div>
      </div>
    </div>
  );
};

const YourRank = ({ user, rank }) => {
  if (!user) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-purple-500 shadow-lg z-20">
      <div className="max-w-4xl mx-auto p-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-purple-400 w-10 text-center">
            {rank}
          </span>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-purple-400"
          />
          <p className="flex-grow font-bold text-white text-base truncate">
            {user.name}
          </p>
          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
            {user.points} pts
          </span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Leaderboard = () => {
  const [activeFilter, setActiveFilter] = useState("All Time");
  const data = leaderboardData[activeFilter] || [];
  const currentUserIndex = data.findIndex((u) => u.id === CURRENT_USER_ID);
  const currentUserData =
    currentUserIndex !== -1 ? data[currentUserIndex] : null;
  const currentUserRank = currentUserIndex + 1;

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-4 pb-28">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent pb-2">
            Top Rankers
          </h1>
          <p className="text-gray-400 text-sm">
            See where you stand among the best!
          </p>
        </header>

        {/* FILTER BUTTONS */}
        <div className="flex justify-center space-x-2 mb-8">
          {["Weekly", "Monthly", "All Time"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                activeFilter === filter
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* PODIUM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-8">
          {top3.map((user, index) => (
            <PodiumItem
              key={user.id}
              user={user}
              rank={index + 1}
              isCurrentUser={user.id === CURRENT_USER_ID}
            />
          ))}
        </div>

        {/* REST */}
        <div className="space-y-3">
          {rest.map((user, index) => (
            <LeaderboardRow
              key={user.id}
              user={user}
              rank={index + 4}
              isCurrentUser={user.id === CURRENT_USER_ID}
            />
          ))}
        </div>
      </div>

      <YourRank user={currentUserData} rank={currentUserRank} />
    </div>
  );
};

export default Leaderboard;
