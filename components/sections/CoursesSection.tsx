'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard, { CourseData } from '@/components/courses/CourseCard';
import { courses as staticCourses } from '@/lib/constants';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function CoursesSection() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        if (res.data?.success && res.data.data.length > 0) {
          setCourses(res.data.data.slice(0, 3));
        } else {
          setCourses(staticCourses.slice(0, 3));
        }
      })
      .catch(() => setCourses(staticCourses.slice(0, 3)))
      .finally(() => setIsLoading(false));
  }, []);

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

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
