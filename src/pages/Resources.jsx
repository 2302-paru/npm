import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Shield, BookOpen, User } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const resourcesData = [
  {
    id: 1,
    label: "HR",
    icon: User,
    description: "Access HR guides, policies, and best practices.",
    path: "/resources/hr",
  },
  {
    id: 2,
    label: "Technical",
    icon: BookOpen,
    description: "Technical resources, tutorials, and cheat sheets.",
    path: "/resources/technical",
  },
  {
    id: 3,
    label: "Safety",
    icon: Shield,
    description: "Safety measures, protocols, and compliance info.",
    path: "/resources/safety",
  },
  {
    id: 4,
    label: "Business",
    icon: Briefcase,
    description: "Business strategies, case studies, and reports.",
    path: "/resources/business",
  },
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">Resources</h1>
      <p className="text-center text-gray-400 mb-8">
        Choose a category to explore learning materials
      </p>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {resourcesData.map((resource) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.id}
              onClick={() => navigate(resource.path)}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-white rounded-xl shadow-lg p-6 w-72 sm:w-80 cursor-pointer transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{resource.label}</h3>
              </div>
              <p className="text-gray-400">{resource.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
