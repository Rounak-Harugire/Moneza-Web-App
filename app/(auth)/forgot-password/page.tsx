'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Zap } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
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

      <h1 className="text-2xl font-bold text-white text-center mb-1">Reset Password</h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email Address"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />
        <Button type="submit" className="w-full justify-center" size="lg">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}
