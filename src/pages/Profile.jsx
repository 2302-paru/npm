import React, { useState, useEffect } from "react";
import {
  BookMarked,
  MessageSquare,
  CalendarPlus,
  Flame,
  Star,
  Zap,
  ChevronRight,
  CheckCircle,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import FuzzyText from "../components/FuzzyText";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [menteeData, setMenteeData] = useState(null);
  const [mentorInfo, setMentorInfo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Modal States ---
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [bookSessionOpen, setBookSessionOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // --- Book Session Data ---
  const availableMentors = [
    {
      id: 1,
      name: "Aanya Sharma",
      avatar: "https://i.pravatar.cc/150?u=aanya",
      title: "Lead Product Designer @ Google",
    },
    {
      id: 2,
      name: "Rohan Mehta",
      avatar: "https://i.pravatar.cc/150?u=rohan",
      title: "Senior UX Designer @ Microsoft",
    },
    {
      id: 3,
      name: "Priya Kapoor",
      avatar: "https://i.pravatar.cc/150?u=priya",
      title: "Product Designer @ Facebook",
    },
  ];

  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Saanvi",
        email: "saanvi@example.com",
        avatar: "https://i.pravatar.cc/150?u=saanvi",
        interests: ["UI/UX", "AR/VR", "Design Thinking", "AI"],
      });

      setMenteeData({
        name: "Saanvi",
        currentPath: "UX/UI Design Pro",
        pathProgress: 68,
        streak: 3,
        points: 710,
        rank: 8,
      });

      setMentorInfo({
        name: "Aanya Sharma",
        avatar: "https://i.pravatar.cc/150?u=aanya",
        title: "Lead Product Designer @ Google",
        interests: ["UI/UX", "Design Thinking", "Product Strategy", "AR/VR"],
      });

      setTodoList([
        {
          id: 1,
          text: "Watch: 'Advanced Prototyping in Figma'",
          completed: true,
        },
        {
          id: 2,
          text: "Submit: 'Mobile App Wireframe' for review",
          completed: false,
        },
        {
          id: 3,
          text: "Session: 'Portfolio Review' with Aanya",
          completed: false,
        },
        { id: 4, text: "Read: 'The Laws of UX'", completed: false },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-xl">
        Loading Dashboard...
      </div>
    );

  const commonInterests = user.interests.filter((interest) =>
    mentorInfo.interests.includes(interest)
  );
  const compatibilityScore = Math.min(
    Math.round((commonInterests.length / user.interests.length) * 100),
    100
  );

  const StatCard = ({ icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 rounded-xl flex items-center space-x-4 border ${color.border} ${color.bg} shadow-lg`}
    >
      <div className={`p-3 rounded-lg ${color.iconBg}`}>{icon}</div>
      <div>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
        <p className="text-white text-xl sm:text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );

  const TodoItem = ({ item, onToggle }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-4 p-3 bg-black/30 rounded-xl border border-gray-700"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
          item.completed ? "bg-green-500" : "border-2 border-gray-500"
        }`}
        onClick={() => onToggle(item.id)}
      >
        {item.completed && <CheckCircle size={20} className="text-black" />}
      </div>
      <p
        className={`flex-grow ${
          item.completed ? "text-gray-500 line-through" : "text-white"
        }`}
      >
        {item.text}
      </p>
      {!item.completed && <ChevronRight className="text-gray-400" />}
    </motion.div>
  );

  const toggleTodo = (id) =>
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { sender: "mentee", text: newMessage }]);
    setNewMessage("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "mentor", text: "Got your message! I’ll reply soon." },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 relative z-10">
        {/* Fuzzy Welcome Header */}
        <FuzzyText
          fontSize="clamp(2rem, 6vw, 5rem)"
          fontWeight={900}
          color="#ffffff"
          baseIntensity={0.1}
          hoverIntensity={0.4}
        >
          Welcome, {user.name}!
        </FuzzyText>

        {/* Profile Card */}
        <div className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col items-center space-y-4 shadow-lg">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-blue-400"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-300">{user.email}</p>
          <button
            onClick={() => setEditProfileOpen(true)}
            className="bg-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Path Card */}
            <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 p-6 rounded-2xl border border-purple-500 shadow-lg relative">
              <p className="text-sm font-semibold text-purple-300">
                YOUR CURRENT PATH
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                {menteeData.currentPath}
              </h2>
              <div className="w-full bg-gray-700/50 rounded-full h-3 mt-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                  style={{ width: `${menteeData.pathProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-300">
                <span>Overall Progress</span>
                <span>{menteeData.pathProgress}%</span>
              </div>
              <button className="mt-6 bg-white text-gray-900 font-bold py-3 px-6 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                <BookMarked size={20} />
                <span>Continue Last Lesson</span>
              </button>
            </div>

            {/* Gamified Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                icon={<Flame className="text-orange-400" />}
                title="Current Streak"
                value={`${menteeData.streak} Days`}
                color={{
                  border: "border-orange-500/30",
                  bg: "bg-orange-500/10",
                  iconBg: "bg-orange-500/20",
                }}
              />
              <StatCard
                icon={<Zap className="text-yellow-400" />}
                title="Total XP"
                value={menteeData.points.toLocaleString()}
                color={{
                  border: "border-yellow-500/30",
                  bg: "bg-yellow-500/10",
                  iconBg: "bg-yellow-500/20",
                }}
              />
              <StatCard
                icon={<Star className="text-purple-400" />}
                title="Your Rank"
                value={`#${menteeData.rank}`}
                color={{
                  border: "border-purple-500/30",
                  bg: "bg-purple-500/10",
                  iconBg: "bg-purple-500/20",
                }}
              />
            </div>

            {/* Compatibility Card */}
            <div className="bg-black/30 p-6 rounded-2xl border border-gray-700 shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Heart className="text-red-400" /> Mentor-Mentee Compatibility
              </h3>
              <p className="text-gray-300 mb-2">
                You and {mentorInfo.name} share{" "}
                <span className="font-semibold">
                  {commonInterests.length} common interests
                </span>
                : {commonInterests.join(", ")}
              </p>
              <div className="w-full bg-gray-700/50 rounded-full h-4 mt-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all"
                  style={{ width: `${compatibilityScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {compatibilityScore}% compatibility
              </p>
            </div>
          </div>

          {/* Right/Sidebar Column */}
          <div className="space-y-8">
            {/* Mentor Card */}
            <div className="bg-black/30 p-6 rounded-2xl border border-gray-700 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Your Mentor</h3>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={mentorInfo.avatar}
                  alt={mentorInfo.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-400"
                />
                <div>
                  <p className="font-bold text-white">{mentorInfo.name}</p>
                  <p className="text-xs text-gray-400">{mentorInfo.title}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setMessageOpen(true)}
                  className="w-full bg-blue-600/80 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-500 transition-colors"
                >
                  <MessageSquare size={18} />
                  <span>Message</span>
                </button>
                <button
                  onClick={() => setBookSessionOpen(true)}
                  className="w-full bg-gray-700/80 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-600 transition-colors"
                >
                  <CalendarPlus size={18} />
                  <span>Book Session</span>
                </button>
              </div>
            </div>

            {/* Your Tasks */}
            <div className="bg-black/30 p-6 rounded-2xl border border-gray-700 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Your Tasks for Today</h3>
              <div className="space-y-3">
                {todoList.map((item) => (
                  <TodoItem key={item.id} item={item} onToggle={toggleTodo} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Book Session Modal */}
        {bookSessionOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 rounded-2xl p-6 max-w-3xl w-full text-white shadow-xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-4">Book a Session</h2>
              <p className="text-gray-300 mb-6">
                Select a mentor to book a session with:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    onClick={() => setSelectedMentor(mentor.id)}
                    className={`p-4 rounded-xl border cursor-pointer hover:border-blue-500 transition-colors ${
                      selectedMentor === mentor.id
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full border-2 border-blue-400"
                      />
                      <div>
                        <p className="font-bold">{mentor.name}</p>
                        <p className="text-sm text-gray-400">{mentor.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setBookSessionOpen(false)}
                  className="bg-gray-700/80 hover:bg-gray-600 px-6 py-2 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedMentor) {
                      alert(
                        `Session booked with ${
                          availableMentors.find((m) => m.id === selectedMentor)
                            .name
                        }!`
                      );
                      setBookSessionOpen(false);
                      setSelectedMentor(null);
                    } else {
                      alert("Please select a mentor first!");
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
