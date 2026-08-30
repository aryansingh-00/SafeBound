import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles, MapPin } from 'lucide-react';

interface PackageBreadcrumbProps {
  destination: string;
}

export const PackageBreadcrumb: React.FC<PackageBreadcrumbProps> = ({ destination }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
      <Link to="/" className="hover:text-brand-600 flex items-center gap-1 shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

      <Link to="/trip-results" className="hover:text-brand-600 flex items-center gap-1 shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Trip Results</span>
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

      <span className="text-slate-900 font-extrabold flex items-center gap-1 shrink-0">
        <MapPin className="w-3.5 h-3.5 text-brand-600" />
        <span>{destination} Package</span>
      </span>
    </nav>
  );
};
