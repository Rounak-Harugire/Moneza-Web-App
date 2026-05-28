'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        if (res.data?.success) {
          setUser(res.data.data);
        }
      } catch {
        // Keep authenticated as false, user is not logged in.
        setUser(null);
      }
    };
    
    fetchUser();
  }, [setUser]);

  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-surface-card text-white border border-surface-border',
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }} 
      />
      {children}
    </>
  );
}
