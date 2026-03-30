'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (inView) {
        let start = from;
        const totalFrames = duration * 60;
        let frame = 0;
        const increment = (to - from) / totalFrames;
        
        const animate = () => {
            frame++;
            start += increment;
            if (frame <= totalFrames) {
                setDisplayValue(Math.floor(start));
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(to);
            }
        };
        requestAnimationFrame(animate);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{displayValue}</span>;
}

export default function StatsCounter() {
  const stats = [
    { num: 1456, suffix: "+", label: "Early Learners" },
    { num: 11, suffix: "", label: "Courses Coming" },
    { num: 500, suffix: "+", label: "Referrals" }
  ];

  return (
    <section className="py-24 bg-surface-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass p-8 rounded-3xl text-center border-t-2 border-primary/30"
            >
              <div className="text-5xl md:text-6xl font-black mb-4 gradient-text">
                <Counter to={stat.num} />{stat.suffix}
              </div>
              <p className="text-xl font-medium text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
