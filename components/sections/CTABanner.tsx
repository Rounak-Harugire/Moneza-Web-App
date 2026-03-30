'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-24 bg-surface relative px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-3xl glass border border-accent/30 p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full mix-blend-screen filter blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-screen filter blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to jumpstart your career?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Join 1,456+ others waiting for the launch. Secure your founder&apos;s pricing.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 w-full relative">
              <Input label="Your Email Address" type="email" />
            </div>
            <Button size="lg" className="shrink-0 mb-4 sm:mb-0 h-[60px] px-8 -translate-y-[8px]" type="submit">
              Get Early Access
            </Button>
          </form>
          <p className="text-gray-500 text-sm mt-0 -translate-y-[8px]">No spam. Just launch updates.</p>
        </div>
      </motion.div>
    </section>
  );
}
