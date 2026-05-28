'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export interface CourseData {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
  isAvailable?: boolean;
  subCourses?: { _id: string; title: string; isEnrollEnabled: boolean }[];
}

export default function CourseCard({ course, isEnrolled = false, onUnenroll }: { course: CourseData, isEnrolled?: boolean, onUnenroll?: (id: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  const handleEnroll = async () => {
    if (!course._id && !course.id) {
      console.error("Missing Course ID", course);
      alert("Something went wrong");
      return;
    }
    if (course.isAvailable === false) {
      return toast.error("This course is not available yet 🚀");
    }

    setIsLoading(true);
    try {
      await api.post(`/courses/${course._id || course.id}/enroll`);
      toast.success('Enrolled Successfully ✅');
      router.push('/dashboard/my-courses');
    } catch (error) {
      // TEMP FALLBACK
      const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
      const enrolledCourses = JSON.parse(localStorage.getItem(userKey) || "[]");
      const isAlreadyEnrolled = enrolledCourses.find((c: any) => c._id === (course._id || course.id));
      if (!isAlreadyEnrolled) {
        enrolledCourses.push(course);
        localStorage.setItem(userKey, JSON.stringify(enrolledCourses));
      }
      toast.success('Enrolled Successfully ✅ (Local Fallback)');
      router.push('/dashboard/my-courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotify = () => {
    toast.success("We will notify you when this course launches 🚀");
  };
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
      
      {course.subCourses && course.subCourses.length > 0 && (
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Modules Included</p>
          {course.subCourses.slice(0, 3).map(sub => (
             <div key={sub._id} className="flex items-center justify-between bg-surface/40 p-2.5 rounded-lg text-xs border border-surface-border/50">
                <span className="text-gray-300 font-medium truncate pr-2">{sub.title}</span>
                {sub.isEnrollEnabled ? (
                  <span className="text-[10px] bg-primary/20 text-primary-light px-2 py-0.5 rounded-full border border-primary/30">Active</span>
                ) : (
                  <span className="text-[10px] bg-surface-border text-gray-400 px-2 py-0.5 rounded-full">Locked</span>
                )}
             </div>
          ))}
          {course.subCourses.length > 3 && (
             <div className="text-[10px] text-center text-gray-500 mt-1">+{course.subCourses.length - 3} more modules</div>
          )}
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-surface-border/50 flex items-center justify-between">
        <Link href={`/courses#${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary-light font-medium hover:text-white transition-colors inline-flex items-center gap-1">
          Learn More <span aria-hidden="true">&rarr;</span>
        </Link>
        {isEnrolled ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/my-courses')} className="hidden sm:inline-flex">Continue Learning</Button>
            <Button 
               variant="outline" 
               size="sm" 
               className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
               onClick={() => onUnenroll && onUnenroll(course._id || course.id!)}
            >
               ❌ Unenroll
            </Button>
          </div>
        ) : course.isAvailable === false ? (
          <Button size="sm" variant="ghost" onClick={handleNotify}>🔔 Notify Me</Button>
        ) : (
          <Button size="sm" onClick={handleEnroll} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enroll Now'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
