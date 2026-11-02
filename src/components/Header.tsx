/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, Settings, HelpCircle, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentUserEmail: string;
  hasWarnings: boolean;
  onWarningsClick: () => void;
  totalComments: number;
}

export default function Header({
  searchTerm,
  onSearchChange,
  currentUserEmail,
  hasWarnings,
  onWarningsClick,
  totalComments
}: HeaderProps) {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-100 flex justify-between items-center px-8 z-40 sticky top-0" id="header-bar">
      {/* Left Title and Indicators */}
      <div className="flex items-center gap-8" id="header-left">
        <span className="font-bold text-lg text-[#0052cc]">ClinicalHQ</span>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm font-semibold text-[#0052cc] border-b-2 border-[#0052cc] pb-1 cursor-default">
            Overview
          </span>
          <span className="text-sm font-medium text-gray-400 hover:text-[#0052cc] transition-colors cursor-pointer">
            Staff Schedule
          </span>
          <span className="text-sm font-medium text-gray-400 hover:text-[#0052cc] transition-colors cursor-pointer">
            Resource Tracker
          </span>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Compliance Safe
          </span>
        </div>
      </div>

      {/* Right Search, Warnings, User Info */}
      <div className="flex items-center gap-4" id="header-right">
        {/* Search Input */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-50 hover:bg-gray-100 border-none rounded-full pl-10 pr-4 py-2 w-72 text-xs focus:ring-2 focus:ring-[#0052cc]/20 focus:bg-white placeholder-gray-400 text-gray-700 transition-all outline-none"
            placeholder={`Search ${totalComments} patient comments...`}
            id="global-search-input"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          {/* Privacy and Sensitive Data Warnings Toggle */}
          {hasWarnings && (
            <button
              onClick={onWarningsClick}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-full relative transition-transform active:scale-95"
              title="Privacy and De-identification Warnings"
              id="btn-warning-toggle"
            >
              <ShieldAlert className="w-5 h-5 animate-bounce" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          )}

          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full cursor-pointer transition-transform active:scale-95 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0052cc] rounded-full"></span>
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full cursor-pointer transition-transform active:scale-95">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full cursor-pointer transition-transform active:scale-95">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-100 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1" id="header-user-profile">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-gray-700">Dr. S. Ils</span>
            <span className="text-[10px] text-gray-400 font-mono">{currentUserEmail}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#5e4db9] overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 cursor-pointer active:scale-95 transition-transform">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1VfqfgpIf7WiGoGlSFzCc3mU5koM9tVtBbOpMLYN-snREHuqkhC8AiwYqB-leLyCp_0njP2IvaZWpZIFt9jBTEkYt26y3_u8AvEdth9w-crcUyOEtzfq-PmvHqJY5RS5swmfprYUoRPvjucjjwKD6z9lXnGvlCzA9v2zqkWgRkl3gBvIXyKlaa5cNFJkUoN25WpoqjoMukW9OHBTjQaFuT--18O4Doflj9X26BHXsyujDwnX7K0k6weZvMaDjJWC1HMqF_3lVe0E" 
              alt="Medical Executive Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
