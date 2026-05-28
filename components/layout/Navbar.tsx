'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post('/auth/logout');
    } catch(e) {}
    logout();
    router.push('/');
    setIsLoggingOut(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="w-8 h-8 text-accent fill-accent" />
            <span className="text-2xl font-bold gradient-text tracking-tight">Moneza</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-white flex items-center gap-1 py-2',
                    pathname === link.href ? 'text-white' : 'text-gray-300'
                  )}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 pt-2"
                    >
                      <div className="glass rounded-xl overflow-hidden py-2 border border-surface-border shadow-xl">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 flex items-center gap-x-2 text-sm text-gray-300 hover:text-white hover:bg-surface-border/50 transition-colors"
                          >
                             <span className="truncate">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="hidden lg:inline-flex" onClick={handleLogout} disabled={isLoggingOut}>
                  Logout
                </Button>
                <Button onClick={() => router.push('/dashboard')}>
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="hidden lg:inline-flex" onClick={() => router.push('/login')}>
                  Login
                </Button>
                <Button onClick={() => router.push('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-surface-border mt-3 overflow-hidden origin-top"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-white"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-surface-border/50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-surface-border/50">
                {isAuthenticated ? (
                  <>
                    <Button variant="outline" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}>
                      Logout
                    </Button>
                    <Button className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); router.push('/dashboard'); }}>
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }}>
                      Login
                    </Button>
                    <Button className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); router.push('/register'); }}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
