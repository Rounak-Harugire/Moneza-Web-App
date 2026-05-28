'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Settings, LogOut, Zap, Menu, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api'; // Added api import
import { useAuthStore } from '@/store/authStore'; // Added store import
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Profile', href: '/dashboard', icon: User },
  { label: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Track logout state
  const clearUser = useAuthStore((state) => state.setUser); // Get state cleaner

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop standard routing link action
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      // 1. Tell Render backend to remove the HTTP-Only cookie [cite: 74, 101]
      await api.post('/auth/logout'); 
    } catch (error) {
      console.error("Backend logout failed, clearing local state anyway:", error);
    } finally {
      // 2. Clear Zustand memory state [cite: 55]
      clearUser(null); 
      
      toast.success('Logged out successfully');
      
      // 3. Clean window redirect to reset all route contexts safely
      window.location.href = '/login';
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <Link href="/" className="flex items-center gap-2 px-6 py-8">
        <Zap className="w-7 h-7 text-accent fill-accent" />
        <span className="text-xl font-bold gradient-text tracking-tight">Moneza</span>
      </Link>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                isActive
                  ? 'bg-primary/20 text-white border-l-2 border-primary'
                  : 'text-gray-400 hover:text-white hover:bg-surface-border/50'
              )}
            >
              <Icon className={cn('w-5 h-5 transition-colors', isActive ? 'text-primary-light' : 'group-hover:text-white')} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* FIXED LOGOUT ACTION AREA */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin text-red-400" />
          ) : (
            <LogOut className="w-5 h-5 transition-colors group-hover:text-red-400" />
          )}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-surface-card border-r border-surface-border z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 glass rounded-xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="md:hidden fixed left-0 top-0 h-full w-72 bg-surface-card border-r border-surface-border z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}