'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Zap } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const strengthLevel = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['bg-transparent', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 md:p-10 w-full border border-surface-border"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <Zap className="w-8 h-8 text-accent fill-accent" />
        <span className="text-2xl font-bold gradient-text tracking-tight">Moneza</span>
      </div>

      <h1 className="text-2xl font-bold text-white text-center mb-1">Create an account</h1>
      <p className="text-gray-400 text-sm text-center mb-8">Join 1,456+ early learners</p>

      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if (agreed) router.push('/dashboard'); }}>
        <Input
          label="Full Name"
          type="text"
          leftIcon={<User className="w-4 h-4" />}
          required
        />
        <Input
          label="Email Address"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
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

        {/* Strength Bar */}
        {password.length > 0 && (
          <div className="pb-2 -mt-2">
            <div className="flex gap-1 h-1.5 mb-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full transition-colors ${level <= strengthLevel ? strengthColors[strengthLevel] : 'bg-surface-border'}`}
                />
              ))}
            </div>
            <p className={`text-xs ${strengthLevel === 1 ? 'text-red-400' : strengthLevel === 2 ? 'text-yellow-400' : 'text-green-400'}`}>
              Password strength: {strengthLabels[strengthLevel]}
            </p>
          </div>
        )}

        <Input
          label="Confirm Password"
          type="password"
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <div className="flex items-start gap-3 py-2">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary rounded border-surface-border"
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the{' '}
            <Link href="#" className="text-primary-light hover:text-white transition-colors">Terms of Service</Link>
            {' '}&amp;{' '}
            <Link href="#" className="text-primary-light hover:text-white transition-colors">Privacy Policy</Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full justify-center mt-2"
          size="lg"
          disabled={!agreed}
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-light hover:text-white font-medium transition-colors">
          Login
        </Link>
      </p>
    </motion.div>
  );
}
