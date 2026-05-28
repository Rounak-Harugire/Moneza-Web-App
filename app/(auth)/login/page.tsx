'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      toast.success('Logged in successfully!');
      setUser(res.data.data);
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 md:p-10 w-full border border-surface-border"
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <Zap className="w-8 h-8 text-accent fill-accent" />
        <span className="text-2xl font-bold gradient-text tracking-tight">Moneza</span>
      </div>

      <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome back</h1>
      <p className="text-gray-400 text-sm text-center mb-8">Sign in to continue learning</p>

      <form className="space-y-2" onSubmit={handleLogin}>
        <Input
          label="Email Address"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            leftIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex justify-end pb-2">
          <Link href="/forgot-password" className="text-sm text-primary-light hover:text-white transition-colors">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full justify-center" size="lg" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-3 text-gray-500">OR</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary-light hover:text-white font-medium transition-colors">
          Register
        </Link>
      </p>
    </motion.div>
  );
}
