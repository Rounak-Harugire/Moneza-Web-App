'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  
  const values = [
    { icon: <Zap className="w-6 h-6 text-accent" />, title: "Action Bias", desc: "We prefer imperfect action over perfect planning." },
    { icon: <Shield className="w-6 h-6 text-primary-light" />, title: "Radical Transparency", desc: "Honest pricing, real outcomes, zero fluff." },
    { icon: <Heart className="w-6 h-6 text-rose-500" />, title: "Student First", desc: "Every decision starts from the learner\u0027s perspective." },
    { icon: <Users className="w-6 h-6 text-teal-400" />, title: "Community Driven", desc: "We learn better when we learn together." }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Story</span>
          </h1>
          <p className="text-lg text-gray-400">
            Founded in Akot, Maharashtra, Moneza was built on a simple belief: world-class education should not be restricted by geography or background. We are on a mission to democratize learning across India.
          </p>
        </div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 border-t-2 border-primary/30 h-full"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary-light" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To equip 1 million learners in India with practical, job-ready skills in technology, finance, and communication within the next 3 years.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-10 border-t-2 border-accent/30 h-full"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              A future where every individual, regardless of their starting point, has the exact tools and knowledge they need to build their dream career.
            </p>
          </motion.div>
        </div>

        {/* Team Placeholder */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass rounded-3xl p-8 text-center flex flex-col items-center">
                <div className="w-32 h-32 rounded-full mb-6 bg-gradient-to-tr from-primary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-surface-card flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Team Member {item}</h3>
                <p className="text-gray-400">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-surface flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-gray-400">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-3xl border border-primary/20 p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Verify a Certificate?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Employers can verify Moneza certificates here to ensure authenticity and review transcript details.
          </p>
          <Button size="lg" variant="outline" onClick={() => router.push('/contact')}>
            Verification Portal
          </Button>
        </div>

      </div>
    </div>
  );
}
