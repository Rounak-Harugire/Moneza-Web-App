'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload: any = { fullName };
      if (password) payload.password = password;
      // We assume email updates might be allowed or ignored by your simple backend
      if (email !== user?.email) payload.email = email;
      
      const res = await api.put('/users/me', payload);
      toast.success('Profile updated successfully!');
      setUser(res.data.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 md:pt-0 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
        <div className="glass rounded-3xl p-8 border border-surface-border">
          <h1 className="text-2xl font-bold text-white mb-6">Profile Settings</h1>
          
          <form className="space-y-4" onSubmit={handleUpdate}>
            <Input
              label="Full Name"
              type="text"
              leftIcon={<User className="w-4 h-4" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            
            <Input
              label="Email Address"
              type="email"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled // Emails typically aren't changeable easily without reverification, but allowed here
            />

            <div className="pt-4 border-t border-surface-border/50">
              <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>
              <Input
                label="New Password (optional)"
                type="password"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" size="lg" disabled={isLoading} className="mt-4">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
