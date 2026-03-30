'use client';

import { motion } from 'framer-motion';
import { Gift, Sparkles, TrendingUp, Infinity } from 'lucide-react';

export default function ReferralSection() {
  const steps = [
    { num: 1, title: "Share Referral Code", desc: "Get your unique referral link from your dashboard." },
    { num: 2, title: "Friends Sign Up", desc: "Share it with friends and they get a sign-up bonus." },
    { num: 3, title: "Earn Rewards", desc: "Earn cash or premium unlocks for every successful referral." }
  ];

  const pills = [
    { icon: <Gift className="w-4 h-4" />, text: "Instant Rewards" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Premium Unlocks" },
    { icon: <Infinity className="w-4 h-4" />, text: "Lifetime Benefits" },
    { icon: <TrendingUp className="w-4 h-4" />, text: "Top Learning" },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-surface-card border border-indigo-500/30 p-8 md:p-16 overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)]"
        >
          {/* subtle glow bg inside the card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 text-center md:text-left">
              India&apos;s Most Rewarding <br className="hidden md:block"/>
              <span className="gradient-text">Referral Program</span>
            </h2>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-16">
              {pills.map((pill, i) => (
                <div key={i} className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-gray-300">
                  <span className="text-primary-light">{pill.icon}</span>
                  {pill.text}
                </div>
              ))}
            </div>

            <div className="mb-16">
              <h3 className="text-xl font-semibold text-white mb-8 text-center md:text-left">How It Works</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-surface-border -z-10" />
                
                {steps.map((step) => (
                  <div key={step.num} className="flex-1 w-full text-center md:text-left relative z-10 flex flex-col md:items-center xl:items-start group">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white mb-6 border-4 border-surface-card shadow-lg mx-auto md:mx-0 group-hover:scale-110 transition-transform">
                      {step.num}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 md:text-center xl:text-left">{step.title}</h4>
                    <p className="text-gray-400 text-sm md:text-center xl:text-left px-0 sm:px-2 xl:px-0">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-8 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-8 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <span className="text-4xl">🔥</span> 50% OFF for first 700 Learners
              </h3>
              <p className="text-gray-400">Join the waitlist to secure your founder&apos;s discount.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
