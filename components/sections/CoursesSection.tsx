'use client';

import { motion } from 'framer-motion';
import CourseCard from '@/components/courses/CourseCard';
import { courses } from '@/lib/constants';

export default function CoursesSection() {
  return (
    <section className="py-24 bg-surface-card relative border-y border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Learning Designed for <span className="gradient-text">Real Life</span>
          </h2>
          <p className="text-lg text-gray-400">
            From mastering AI tools to managing your finances globally, choose from our specialized modules building the skills you actually need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div 
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
