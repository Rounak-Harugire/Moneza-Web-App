'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Award, Target, Zap } from 'lucide-react';

export default function FeaturesGrid() {
  const router = useRouter();

  const highlights = [
    { icon: <Zap className="text-accent" />, text: "Epic Referral Rewards" },
    { icon: <Target className="text-primary-light" />, text: "Real Skills for Real Jobs" },
    { icon: <Award className="text-yellow-400" />, text: "Verified Certificates" }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Revolutionizing India&apos;s <br/>
              <span className="gradient-text">Learning Journey</span>
            </h2>
            <p className="text-lg text-gray-400">
              We focus on what actually matters. No fluff, no outdated theory. 
              Our curriculum is designed to give you practical, immediately applicable knowledge in AI, language, finance, and wellness.
            </p>
            
            <div className="space-y-4 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-lg font-medium text-white">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button size="lg" onClick={() => router.push('/courses')}>
                Explore Our Courses
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Mockup Placeholder */}
            <div className="aspect-square relative rounded-3xl overflow-hidden glass border-2 border-primary/20 bg-gradient-to-br from-surface-card to-surface p-8 shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              <div className="text-center z-10">
                <div className="w-24 h-24 mx-auto bg-primary rounded-2xl rotate-12 mb-6 flex items-center justify-center shadow-lg shadow-primary/50">
                   <Zap className="w-12 h-12 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">App Experience</h3>
                <p className="text-gray-400 mt-2">Coming to mobile soon.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
