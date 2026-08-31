import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Bell, 
  ChevronDown,
  Home,
  Calendar,
  Tag,
  Compass,
  HelpCircle,
  ShieldCheck,
  MessageSquareText,
  Terminal,
  Cpu,
  BrainCircuit,
  Layers,
  CheckSquare,
  Network,
  CreditCard,
  Activity,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: Sparkles },
    { name: 'Plan My Trip', path: '/plan-trip', icon: Sparkles },
    { name: 'Chat with AI', path: '/ai-chat', icon: MessageSquareText, highlight: true },
    { name: 'Trips', path: '/trips', icon: Calendar },
    { name: 'Deals', path: '/deals', icon: Tag },
    { name: 'Destinations', path: '/destinations', icon: Compass },
    { name: 'How it Works', path: '/#how-it-works', icon: HelpCircle },
    { name: 'Support', path: '/#support', icon: ShieldCheck },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const sectionId = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/90 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* SafeBound Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <Send className="w-5 h-5 text-white transform -rotate-45 translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">
              Safe<span className="text-brand-600">Bound</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path) && !link.path.startsWith('/#'));

              const Icon = link.icon;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-semibold transition-all duration-150 rounded-xl ${
                    isActive
                      ? 'text-brand-600 font-bold bg-brand-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Notification Bell with Badge 3 */}
            <Link
              to="/notifications"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
              title="Notifications & Alerts Center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                3
              </span>
            </Link>

            {/* User Profile Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop"
                  alt="Aryan Singh"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
                />
                <span className="text-xs font-bold text-slate-800">Aryan Singh</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">Aryan Singh</p>
                    <p className="text-[11px] text-slate-500 truncate">aryan@safebound.ai</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-700 bg-brand-50/80 rounded-xl transition"
                  >
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>AI Command Center Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition"
                  >
                    <User className="w-4 h-4 text-brand-600" />
                    <span>Profile & Traveller Directory</span>
                  </Link>
                  <Link
                    to="/trips"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition"
                  >
                    <Calendar className="w-4 h-4 text-brand-600" />
                    <span>My Trips & Bookings</span>
                  </Link>
                  <Link
                    to="/ai-chat"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition"
                  >
                    <MessageSquareText className="w-4 h-4 text-brand-600" />
                    <span>Chat with SafeBound AI</span>
                  </Link>
                  <Link
                    to="/plan-trip"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition"
                  >
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>AI Trip Configurator</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-700 bg-amber-50/80 rounded-xl border border-amber-200/70 transition"
                  >
                    <Terminal className="w-4 h-4 text-amber-600" />
                    <span>⚡ AI Agent Ops Console (Admin)</span>
                  </Link>
                  <Link
                    to="/architecture"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50/80 rounded-xl border border-indigo-200/70 transition"
                  >
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>🧠 Backend Architecture & Swarm Sandbox</span>
                  </Link>
                  <Link
                    to="/decision-agent"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50/80 rounded-xl border border-emerald-200/70 transition"
                  >
                    <BrainCircuit className="w-4 h-4 text-emerald-600" />
                    <span>🎯 AI Travel Decision Agent</span>
                  </Link>
                  <Link
                    to="/package-builder"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-sky-700 bg-sky-50/80 rounded-xl border border-sky-200/70 transition"
                  >
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>📦 AI Package Builder & Optimizer</span>
                  </Link>
                  <Link
                    to="/booking-orchestrator"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-teal-700 bg-teal-50/80 rounded-xl border border-teal-200/70 transition"
                  >
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                    <span>🛡️ Booking Orchestrator & Swarm</span>
                  </Link>
                  <Link
                    to="/provider-agents"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-violet-700 bg-violet-50/80 rounded-xl border border-violet-200/70 transition"
                  >
                    <Network className="w-4 h-4 text-violet-600" />
                    <span>🔌 Specialized Provider Agents</span>
                  </Link>
                  <Link
                    to="/checkout/SB-TRIP-MUSSOORIE-4D"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50/80 rounded-xl border border-blue-200/70 transition"
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>💳 Razorpay Checkout & Escrow</span>
                  </Link>
                  <Link
                    to="/live-monitoring"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50/80 rounded-xl border border-emerald-200/70 transition"
                  >
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>📡 Live Monitoring & Recovery</span>
                  </Link>
                  <Link
                    to="/trips/SB-TRIP-MUSSOORIE-4D/itinerary"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-orange-700 bg-orange-50/80 rounded-xl border border-orange-200/70 transition"
                  >
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    <span>📋 Smart Itinerary & Documents</span>
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenAuth && onOpenAuth('signin');
                    }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition mt-1 pt-2 border-t border-slate-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Switch Account</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/ai-chat"
              className="p-2 text-brand-600 bg-brand-50 rounded-full"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="w-5 h-5" />
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold flex items-center gap-2 ${
                  location.pathname === link.path
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/ai-chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-semibold text-white bg-brand-600 rounded-full shadow-md shadow-brand-600/20"
            >
              Chat with SafeBound AI ✨
            </Link>
            <Link
              to="/trips"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-semibold text-slate-700 border border-slate-300 rounded-full"
            >
              My Booked Trips (2)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
