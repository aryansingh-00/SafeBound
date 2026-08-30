import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md">
                <Send className="w-4 h-4 text-white transform -rotate-45" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-sans">
                Safe<span className="text-brand-400">Bound</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              SafeBound is an AI Travel Commerce Agent. We discover, plan, optimize, and coordinate complete multi-item trips under one unified payment and zero hassle.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PCI-DSS Level 1 & Razorpay Verified</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/plan-trip" className="hover:text-white transition">AI Trip Planner</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition">Destinations</Link></li>
              <li><Link to="/deals" className="hover:text-white transition">Live Deals</Link></li>
              <li><Link to="/trips" className="hover:text-white transition">My Trips</Link></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-white transition">About SafeBound</a></li>
              <li><a href="#agents" className="hover:text-white transition">AI Agent Network</a></li>
              <li><a href="#careers" className="hover:text-white transition">Careers <span className="text-[10px] bg-brand-600/40 text-brand-300 px-1.5 py-0.5 rounded">Hiring</span></a></li>
              <li><a href="#press" className="hover:text-white transition">Press & Media</a></li>
              <li><a href="#support" className="hover:text-white transition">24/7 Support Desk</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#cancellation" className="hover:text-white transition">Cancellation & Refund</a></li>
              <li><a href="#security" className="hover:text-white transition">Security Architecture</a></li>
              <li><a href="#safety-score" className="hover:text-white transition">SafeBound Safety Index</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SafeBound Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for intelligent modern travel</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
