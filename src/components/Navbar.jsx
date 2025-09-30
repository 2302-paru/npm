import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Zap, Star, Book, Home, User, Folder } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [xp, setXp] = useState(2450);
  const [level, setLevel] = useState(7);
  const [streak, setStreak] = useState(12);
  const location = useLocation();
  const activeLink = location.pathname;

  const maxXp = level * 500;
  const xpProgress = (xp / maxXp) * 100;

  const navLinks = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/lessons', label: 'Lessons', icon: Book },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/resources', label: 'Resources', icon: Folder },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setXp(prev => {
      const newXp = prev + 10;
      if (newXp >= maxXp) {
        setLevel(l => l + 1);
        return newXp - maxXp;
      }
      return newXp;
    });
  };

  return (
    <nav className="bg-black-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-600 rounded-lg p-2 shadow-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl">CodeQuest</h1>
              <p className="text-gray-400 text-xs">Learn. Code. Level Up.</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeLink === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-700 text-white shadow-md'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Stats & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Level */}
            <div className="hidden lg:flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold">
              <Star className="h-4 w-4 mr-1" />
              Lv {level}
            </div>

            {/* Streak */}
            <div className="hidden lg:flex items-center bg-orange-400 text-orange-900 px-2 py-1 rounded-full text-sm font-bold">
              <Zap className="h-4 w-4 mr-1" />
              {streak}🔥
            </div>

            {/* XP Bar */}
            <div className="hidden sm:block bg-white/20 rounded-full p-1 w-32">
              <div className="flex items-center justify-between px-2 mb-1 text-xs font-semibold text-white">
                <span>XP</span>
                <span>{xp}/{maxXp}</span>
              </div>
              <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeLink === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition ${
                      isActive ? 'bg-indigo-700 text-white shadow-md' : 'hover:bg-indigo-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
