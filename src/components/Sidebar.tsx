/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building, 
  Upload, 
  SlidersHorizontal, 
  Activity, 
  BarChart3, 
  FolderCheck, 
  UserPlus, 
  LifeBuoy,
  FileSpreadsheet
} from 'lucide-react';

export type ScreenId = 'office' | 'upload' | 'config' | 'processing' | 'individual' | 'executive' | 'human-review';

interface SidebarProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  selectedCount: number;
  hasData: boolean;
  activeProcessingCount: number;
}

export default function Sidebar({
  currentScreen,
  onScreenChange,
  selectedCount,
  hasData,
  activeProcessingCount
}: SidebarProps) {
  const navItems = [
    {
      id: 'office' as ScreenId,
      label: 'Virtual Office',
      icon: Building,
      badge: null
    },
    {
      id: 'upload' as ScreenId,
      label: 'Data Upload & Validation',
      icon: Upload,
      badge: hasData ? 'Loaded' : 'Required'
    },
    {
      id: 'config' as ScreenId,
      label: 'Agent Configuration',
      icon: SlidersHorizontal,
      badge: selectedCount > 0 ? `${selectedCount} Active` : null
    },
    {
      id: 'processing' as ScreenId,
      label: 'Live Processing Status',
      icon: Activity,
      badge: activeProcessingCount > 0 ? 'Analyzing...' : null
    },
    {
      id: 'executive' as ScreenId,
      label: 'Combined Executive Insights',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'individual' as ScreenId,
      label: 'Individual Agent Outputs',
      icon: FileSpreadsheet,
      badge: null
    },
    {
      id: 'human-review' as ScreenId,
      label: 'Human Review Queue',
      icon: FolderCheck,
      badge: 'Action Required'
    }
  ];

  return (
    <aside className="w-[290px] h-screen sticky top-0 left-0 bg-white shadow-sm flex flex-col py-8 border-r border-gray-100 z-50 overflow-y-auto">
      {/* Brand Header */}
      <div className="px-6 mb-8" id="sidebar-brand-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0052cc] rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/10">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-base text-[#003d9b] leading-tight">ClinicalHQ Portal</h1>
            <p className="text-xs text-gray-400 mt-0.5">Distributed Multi-Agent Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3" id="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#dae2ff] text-[#001848] border-l-4 border-[#0052cc] pl-3'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
              id={`nav-item-${item.id}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0052cc]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.badge === 'Loaded' || item.badge.includes('Active')
                    ? 'bg-[#e5deff] text-[#4633a0]'
                    : item.badge === 'Required'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : item.badge === 'Action Required'
                    ? 'bg-red-50 text-red-600 border border-red-100'
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Support Controls */}
      <div className="mt-auto px-4 pt-4 border-t border-gray-50" id="sidebar-footer">
        <button 
          onClick={() => onScreenChange('upload')}
          className="w-full bg-[#0052cc] hover:bg-[#003d9b] text-white py-3 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 mb-4 shadow-md shadow-blue-500/10"
          id="btn-upload-trigger"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Dataset CSV
        </button>

        <div className="flex flex-col gap-1">
          <a
            href="mailto:support@hospitalclinicalhq.org"
            className="flex items-center gap-3 text-gray-400 hover:text-gray-600 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
            id="sidebar-support-link"
          >
            <LifeBuoy className="w-4 h-4 text-gray-300" />
            Clinical Support Helpdesk
          </a>
          <div className="px-4 text-[10px] text-gray-400">
            Current Session: <span className="font-mono">10-Jul-2026 UTC</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
