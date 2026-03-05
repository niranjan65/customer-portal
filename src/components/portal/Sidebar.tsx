import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  CreditCard,
  RotateCcw,
  User,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  X
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';

export type ViewType =
  | 'dashboard'
  | 'orders'
  | 'invoices'
  | 'payments'
  | 'returns'
  | 'profile'
  | 'support'
  | 'settings';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const LOGO_URL =
  'https://d64gsuwffb70l.cloudfront.net/698d2f84e1606522e1e4386f_1770872684443_6ea989b0.png';

const navItems: {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'returns', label: 'Returns', icon: RotateCcw },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'support', label: 'Support', icon: LifeBuoy }
];

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse
}) => {

  const { profile, signOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* MOBILE OPEN BUTTON */}
{!mobileOpen && (
  <button
    onClick={() => setMobileOpen(true)}
    className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-md"
  >
    ☰
  </button>
)}

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed top-0 left-0 h-screen bg-[#0f172a] text-white flex flex-col z-40
        transition-transform duration-300
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700/50">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-[#1a1a2e] flex items-center justify-center overflow-hidden border border-slate-600/50">
              <img src={LOGO_URL} className="w-8 h-8 object-contain" />
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-sm font-bold">Courts PNG</h1>
                <p className="text-[10px] text-slate-400">
                  Customer Portal
                </p>
              </div>
            )}

          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* USER INFO */}
        {profile && !collapsed && (
          <div className="px-4 py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-xs font-bold">
                {getInitials(profile.full_name || 'U')}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile.full_name}
                </p>

                <p className="text-[10px] text-slate-400 truncate">
                  {profile.company || profile.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">

          {navItems.map((item) => {

            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative
                  ${
                    isActive
                      ? 'bg-red-500/15 text-red-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
              >

                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-red-500 rounded-r-full" />
                )}

                <Icon className="w-5 h-5 flex-shrink-0" />

                {!collapsed && (
                  <span className="truncate">
                    {item.label}
                  </span>
                )}

              </button>
            );
          })}
        </nav>

        {/* BOTTOM MENU */}
        <div className="border-t border-slate-700/50 p-3 space-y-1">

          <button
            onClick={() => {
              onViewChange('settings');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
            ${
              activeView === 'settings'
                ? 'bg-red-500/15 text-red-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />

            {!collapsed && <span>Settings</span>}
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />

            {!collapsed && <span>Sign Out</span>}
          </button>

        </div>

        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

      </aside>
    </>
  );
};

export default Sidebar;