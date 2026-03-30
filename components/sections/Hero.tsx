'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function Hero() {
  const router = useRouter();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* CSS Gradient Mesh Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 mix-blend-screen filter blur-[80px] animate-fade-in" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/20 mix-blend-screen filter blur-[80px] animate-slide-up" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="mb-6">
            <Badge variant="outline" className="px-4 py-1.5 text-sm bg-surface-card/50 backdrop-blur-md">
              <span className="mr-2">🚀</span> Launching 2025 | India&apos;s Next-Gen Learning
            </Badge>
          </motion.div>

          <motion.h1 
            variants={item}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight pb-2"
          >
            <span className="gradient-text">India&apos;s Next-Gen</span><br />
            Learning Revolution
          </motion.h1>

          <motion.p 
            variants={item}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl"
          >
            AI, English, Finance &amp; Health — all in one app.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Button size="lg" onClick={() => router.push('/register')}>
              Get Early Access
            </Button>
            <Button size="lg" variant="ghost" onClick={() => router.push('/courses')}>
              Explore Courses
            </Button>
          </motion.div>

          <motion.div variants={item} className="pt-8 border-t border-surface-border w-full max-w-2xl">
            <p className="text-gray-400 font-medium">
              <span className="text-white font-bold">1,456+</span> Learners Waitlisted <span className="mx-2">•</span> 
              <span className="text-white font-bold">11</span> Courses Coming <span className="mx-2">•</span>
              Launch Soon
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
