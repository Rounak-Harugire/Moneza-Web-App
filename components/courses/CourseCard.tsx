'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface CourseData {
  title: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
}

export default function CourseCard({ course }: { course: CourseData }) {
  const colorMap: Record<string, string> = {
    indigo: 'border-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/40',
    green: 'border-green-500 shadow-green-500/20 hover:shadow-green-500/40',
    blue: 'border-blue-500 shadow-blue-500/20 hover:shadow-blue-500/40',
    rose: 'border-rose-500 shadow-rose-500/20 hover:shadow-rose-500/40',
    yellow: 'border-yellow-500 shadow-yellow-500/20 hover:shadow-yellow-500/40',
    teal: 'border-teal-500 shadow-teal-500/20 hover:shadow-teal-500/40',
    purple: 'border-purple-500 shadow-purple-500/20 hover:shadow-purple-500/40',
  };

  const badgeMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'outline'> = {
    indigo: 'default',
    green: 'success',
    blue: 'default',
    rose: 'error',
    yellow: 'warning',
    teal: 'success',
    purple: 'default',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        'glass rounded-2xl p-6 flex flex-col h-full border-t-4 transition-all duration-300',
        colorMap[course.color] || colorMap.indigo
      )}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 bg-surface-card border border-surface-border">
        {course.emoji}
      </div>
      <div className="mb-3">
        <Badge variant={badgeMap[course.color] || 'default'}>{course.category}</Badge>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 text-sm mb-6 flex-1">{course.description}</p>
      
      <div className="mt-auto">
        <Link href={`/courses#${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary-light font-medium hover:text-white transition-colors inline-flex items-center gap-1">
          Learn More <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}
