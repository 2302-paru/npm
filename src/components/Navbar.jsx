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
    { path: '/', label: 'Home', icon: Home },
    { path: '/lessons', label: 'Lessons', icon: Book },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/resources', label: 'Resources', icon: Folder },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    // Simulate XP gain on navigation
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
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2 shadow-md transform hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl">CodeQuest</h1>
              <p className="text-indigo-200 text-xs">Learn. Code. Level Up.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Stats & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Level Badge */}
            <div className="hidden lg:flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full shadow-md">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="font-bold text-sm">Lv {level}</span>
            </div>

            {/* Streak Counter */}
            <div className="hidden lg:flex items-center bg-orange-400 text-orange-900 px-3 py-1 rounded-full shadow-md">
              <Zap className="h-4 w-4 mr-1 fill-current" />
              <span className="font-bold text-sm">{streak} 🔥</span>
            </div>

            {/* XP Progress */}
            <div className="hidden sm:block bg-white/20 rounded-full p-1 backdrop-blur-sm w-32">
              <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-white text-xs font-semibold">XP</span>
                <span className="text-white text-xs font-semibold">{xp}/{maxXp}</span>
              </div>
              <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile XP Bar */}
        <div className="sm:hidden pb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold">
                Lv {level}
              </div>
              <div className="bg-orange-400 text-orange-900 px-2 py-0.5 rounded-full text-xs font-bold">
                {streak}🔥
              </div>
            </div>
            <span className="text-white text-xs font-semibold">{xp}/{maxXp} XP</span>
          </div>
          <div className="bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 border-t border-indigo-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                  {isActive && <Zap className="h-4 w-4 ml-auto text-yellow-500 fill-current" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;