import React, { useState } from "react";
import {
  BarChart,
  Bell,
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Users,
  Video,
  AlertTriangle,
  CalendarPlus,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import FuzzyText from "../components/FuzzyText";
import Navbar from "../components/Navbar";

// --- MOCK DATA ---
const initialMentorData = {
  name: "Aanya",
  activeMentees: 5,
  avgProgress: 78,
  upcomingSessions: 2,
};

const initialMentees = [
  {
    id: 1,
    name: "Rohan Verma",
    avatar: "https://i.pravatar.cc/150?u=3",
    progress: 95,
    status: "on_track",
    lastActivity: 'Completed "UI/UX Prototyping"',
    needsReview: false,
  },
  {
    id: 2,
    name: "Priya Singh",
    avatar: "https://i.pravatar.cc/150?u=6",
    progress: 80,
    status: "on_track",
    lastActivity: 'Submitted "Portfolio Website" for review',
    needsReview: true,
  },
  {
    id: 3,
    name: "Kabir Gupta",
    avatar: "https://i.pravatar.cc/150?u=7",
    progress: 45,
    status: "stuck",
    lastActivity: 'Struggling with "React State Management"',
    needsReview: false,
  },
  {
    id: 4,
    name: "Meera Nair",
    avatar: "https://i.pravatar.cc/150?u=4",
    progress: 90,
    status: "on_track",
    lastActivity: 'Submitted "Case Study" for review',
    needsReview: true,
  },
  {
    id: 5,
    name: "Devansh Rao",
    avatar: "https://i.pravatar.cc/150?u=5",
    progress: 65,
    status: "on_track",
    lastActivity: 'Asked a question about "API Integration"',
    needsReview: false,
  },
];

const initialSessions = [
  {
    id: 1,
    menteeName: "Kabir Gupta",
    topic: "React State Management Deep Dive",
    time: "2025-10-05T16:00",
  },
  {
    id: 2,
    menteeName: "Priya Singh",
    topic: "Portfolio Review & Feedback",
    time: "2025-10-06T11:00",
  },
];

const initialAchievements = [
  { id: 1, title: "First 10 Sessions", unlocked: true },
  { id: 2, title: "Career Catalyst", unlocked: false },
  { id: 3, title: "Project Pro", unlocked: true },
];

// --- HELPER COMPONENTS ---
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r p-4 rounded-xl flex items-center space-x-4 border border-gray-700 shadow-lg"
  >
    <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-300 text-sm">{title}</p>
      <p className="text-white text-xl sm:text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const MenteeRow = ({ mentee, onReview }) => {
  const statusStyles = {
    on_track: {
      text: "On Track",
      icon: <CheckCircle size={16} className="text-green-400" />,
      color: "bg-green-500/20 text-green-400",
    },
    stuck: {
      text: "Stuck",
      icon: <AlertTriangle size={16} className="text-yellow-400" />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  };
  const currentStatus = statusStyles[mentee.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 rounded-xl bg-black/30 border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={mentee.avatar}
          alt={mentee.name}
          className="w-12 h-12 rounded-full border-2 border-gray-600"
        />
        <div>
          <p className="text-white font-semibold">{mentee.name}</p>
          <p className="text-gray-400 text-xs">{mentee.lastActivity}</p>
        </div>
      </div>

      <div className="w-full sm:w-1/4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
            style={{ width: `${mentee.progress}%` }}
          ></div>
        </div>
        <p className="text-gray-300 text-xs text-right mt-1">
          {mentee.progress}%
        </p>
      </div>

      <div
        className={`hidden sm:flex items-center space-x-2 text-sm px-3 py-1 rounded-full ${currentStatus.color}`}
      >
        {currentStatus.icon} <span>{currentStatus.text}</span>
      </div>

      <button
        onClick={() => onReview(mentee.id)}
        className={`px-4 py-2 rounded-full border-2 font-semibold transition ${
          mentee.needsReview
            ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-500"
            : "bg-black border-gray-600 text-gray-300 hover:bg-gray-800"
        }`}
      >
        {mentee.needsReview ? "Review Now" : "View Profile"}
      </button>
    </motion.div>
  );
};

// --- MAIN DASHBOARD ---
const MentorDashboard = () => {
  const [mentorData, setMentorData] = useState(initialMentorData);
  const [mentees, setMentees] = useState(initialMentees);
  const [sessions, setSessions] = useState(initialSessions);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [newSession, setNewSession] = useState({
    menteeId: "",
    topic: "",
    time: "",
  });
  const [showUpcoming, setShowUpcoming] = useState(false);

  const pendingReviews = mentees.filter((m) => m.needsReview).length;

  const upcomingSession = sessions
    .map((s) => ({ ...s, dateObj: new Date(s.time) }))
    .sort((a, b) => a.dateObj - b.dateObj)[0];

  const handleReview = (id) => {
    setMentees((prev) =>
      prev.map((m) => (m.id === id ? { ...m, needsReview: false } : m))
    );
  };

  const handleAddSession = () => {
    if (!newSession.menteeId || !newSession.topic || !newSession.time) return;
    const mentee = mentees.find((m) => m.id === parseInt(newSession.menteeId));
    setSessions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        menteeName: mentee.name,
        topic: newSession.topic,
        time: newSession.time,
      },
    ]);
    setMentorData((prev) => ({
      ...prev,
      upcomingSessions: prev.upcomingSessions + 1,
    }));
    setNewSession({ menteeId: "", topic: "", time: "" });
    setShowSessionForm(false);
  };

  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <main className="flex-1 p-6 flex flex-col gap-6 relative z-10">
        <FuzzyText
          fontSize="clamp(2rem, 6vw, 5rem)"
          fontWeight={900}
          color="#ffffff"
          baseIntensity={0.1}
          hoverIntensity={0.4}
        >
          Welcome back, {mentorData.name}!
        </FuzzyText>

        {/* Header Buttons */}
        <div className="flex items-center space-x-3">
          {/* Bell */}
          <button
            onClick={() => setShowUpcoming(!showUpcoming)}
            className="p-3 rounded-full border-2 border-gray-600 hover:bg-gray-900 transition relative"
          >
            <Bell size={24} />
            {upcomingSession && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showUpcoming && upcomingSession && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-20 right-6 bg-black/90 p-4 rounded-xl border border-gray-700 shadow-lg w-72 z-50"
            >
              <h3 className="font-semibold text-white mb-2">
                Upcoming Session
              </h3>
              <p className="text-sm">
                <strong>Topic:</strong> {upcomingSession.topic}
              </p>
              <p className="text-sm">
                <strong>Mentee:</strong> {upcomingSession.menteeName}
              </p>
              <p className="text-sm text-green-400">
                <strong>Date:</strong>{" "}
                {new Date(upcomingSession.time).toLocaleString()}
              </p>
              <button
                onClick={() => setShowUpcoming(false)}
                className="mt-3 px-3 py-1 bg-red-600 rounded-full hover:bg-red-500 text-white font-semibold"
              >
                Close
              </button>
            </motion.div>
          )}

          {/* Set Availability */}
          <button
            onClick={() => setShowSessionForm(true)}
            className="px-6 py-3 rounded-full border-2 border-white hover:bg-white hover:text-black transition flex items-center space-x-2 font-semibold"
          >
            <CalendarPlus size={20} /> <span>Set Availability</span>
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={<Users size={20} />}
            title="Mentees"
            value={mentorData.activeMentees}
            color="bg-blue-600"
          />
          <StatCard
            icon={<BarChart size={20} />}
            title="Avg. Progress"
            value={`${mentorData.avgProgress}%`}
            color="bg-purple-600"
          />
          <StatCard
            icon={<Clock size={20} />}
            title="Upcoming"
            value={mentorData.upcomingSessions}
            color="bg-green-600"
          />
          <StatCard
            icon={<BookOpen size={20} />}
            title="Pending"
            value={pendingReviews}
            color="bg-yellow-500"
          />
        </div>

        {/* Mentees & Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4">
            {mentees.map((m) => (
              <MenteeRow key={m.id} mentee={m} onReview={handleReview} />
            ))}
          </div>

          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="p-4 bg-black/30 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="font-semibold text-white mb-2">Up Next</h3>
              {sessions.map((s) => (
                <motion.div
                  key={s.id}
                  className="flex items-center space-x-3 bg-black/50 p-3 rounded-xl mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Video className="text-blue-400" />
                  <div>
                    <p className="font-semibold">{s.topic}</p>
                    <p className="text-gray-400 text-sm">
                      {s.menteeName} •{" "}
                      <span className="text-green-400">
                        {new Date(s.time).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="p-4 bg-black/30 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="font-semibold text-white mb-2">Achievements</h3>
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-center space-x-2 p-2 rounded-full ${
                    a.unlocked ? "bg-yellow-500/20" : "bg-gray-700/50"
                  }`}
                >
                  <Award
                    className={a.unlocked ? "text-yellow-400" : "text-gray-400"}
                  />
                  <span
                    className={
                      a.unlocked
                        ? "text-yellow-300 font-semibold"
                        : "text-gray-300"
                    }
                  >
                    {a.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SESSION FORM */}
      {showSessionForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black/90 p-6 rounded-2xl w-full max-w-md border border-gray-700 shadow-lg relative">
            <button
              onClick={() => setShowSessionForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X />
            </button>
            <h3 className="text-2xl font-bold mb-4">Schedule New Session</h3>
            <div className="space-y-3">
              <select
                value={newSession.menteeId}
                onChange={(e) =>
                  setNewSession((prev) => ({
                    ...prev,
                    menteeId: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-full border-2 border-gray-600 bg-black text-white"
              >
                <option value="">Select Mentee</option>
                {mentees.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Session Topic"
                value={newSession.topic}
                onChange={(e) =>
                  setNewSession((prev) => ({ ...prev, topic: e.target.value }))
                }
                className="w-full p-3 rounded-full border-2 border-gray-600 bg-black text-white"
              />
              <input
                type="datetime-local"
                value={newSession.time}
                onChange={(e) =>
                  setNewSession((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full p-3 rounded-full border-2 border-gray-600 bg-black text-white"
              />
              <button
                onClick={handleAddSession}
                className="w-full py-3 rounded-full border-2 border-white hover:bg-white hover:text-black transition font-semibold mt-2"
              >
                Add Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
