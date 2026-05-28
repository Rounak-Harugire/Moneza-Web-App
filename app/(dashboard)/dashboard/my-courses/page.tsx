'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard, { CourseData } from '@/components/courses/CourseCard';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    api.get('/dashboard/my-courses')
      .then(res => {
        if (res.data?.success && res.data.data.length > 0) {
          setEnrollments(res.data.data);
        } else {
          const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
          const local = JSON.parse(localStorage.getItem(userKey) || "[]");
          setEnrollments(local.map((c: any) => ({ _id: c._id || Math.random().toString(), course: c })));
        }
      })
      .catch(() => {
        const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
        const local = JSON.parse(localStorage.getItem(userKey) || "[]");
        setEnrollments(local.map((c: any) => ({ _id: c._id || Math.random().toString(), course: c })));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUnenroll = async (courseId: string) => {
    if (!courseId) {
      console.error("Missing course ID");
      return;
    }
    const confirm = window.confirm("Are you sure you want to unenroll?");
    if (!confirm) return;

    try {
      await api.delete(`/courses/${courseId}/enroll`);
      setEnrollments(prev => prev.filter(e => (e.course._id || e.course.id) !== courseId));
      toast.success("Course removed successfully ❌");
    } catch (err) {
      const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
      const courses = JSON.parse(localStorage.getItem(userKey) || "[]");
      const updated = courses.filter((c: any) => (c._id || c.id) !== courseId);
      localStorage.setItem(userKey, JSON.stringify(updated));
      setEnrollments(prev => prev.filter(e => (e.course._id || e.course.id) !== courseId));
      toast.success("Course removed successfully ❌");
    }
  };

  return (
    <div className="pt-16 md:pt-0 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <h1 className="text-3xl font-bold text-white mb-6">My Enrolled Courses</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="glass rounded-3xl p-8 border border-surface-border text-center">
            <h3 className="text-xl font-semibold text-white mb-2">No active enrollments</h3>
            <p className="text-gray-400">Head over to our courses catalog to find something new!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enr, i) => (
              <CourseCard key={enr._id} course={enr.course} isEnrolled onUnenroll={handleUnenroll} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
