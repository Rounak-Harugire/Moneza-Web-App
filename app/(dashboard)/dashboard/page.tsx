'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Award, UserCircle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [statsData, setStatsData] = useState({
    enrolledCourses: 0,
    certificates: 0,
    profileCompletion: user?.profileCompletion || 70
  });

  useEffect(() => {
    api.get('/dashboard/stats').then(res => {
      if (res.data?.success && res.data.data.enrolledCourses > 0) {
        setStatsData(res.data.data);
      } else {
        const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
        const local = JSON.parse(localStorage.getItem(userKey) || "[]");
        setStatsData(prev => ({ ...prev, enrolledCourses: local.length }));
      }
    }).catch(() => {
      const userKey = user?.email ? `myCourses_${user.email}` : "myCourses";
      const local = JSON.parse(localStorage.getItem(userKey) || "[]");
      setStatsData(prev => ({ ...prev, enrolledCourses: local.length }));
    });
  }, []);

  const stats = [
    { label: 'Courses Enrolled', value: statsData.enrolledCourses.toString(), icon: <BookOpen className="w-6 h-6 text-primary-light" /> },
    { label: 'Certificates', value: statsData.certificates.toString(), icon: <Award className="w-6 h-6 text-yellow-400" /> },
    { label: 'Profile Complete', value: `${statsData.profileCompletion}%`, icon: <UserCircle className="w-6 h-6 text-accent" /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-16 md:pt-0 min-h-screen">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

        {/* Welcome Banner */}
        <motion.div variants={item} className="glass rounded-3xl p-8 border border-primary/20">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, <span className="gradient-text">{user?.fullName || 'Learner'} 👋</span>
          </h1>
          <p className="text-gray-400 mt-2">Here&apos;s what&apos;s happening with your account today.</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass rounded-2xl p-6 flex items-center gap-4 border border-surface-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* My Courses — Empty State */}
        <motion.div variants={item} className="glass rounded-3xl p-8 border border-surface-border">
          <h2 className="text-xl font-bold text-white mb-6">My Courses</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-surface-card flex items-center justify-center mb-2">
              <BookOpen className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white">No courses yet</h3>
            <p className="text-gray-400 max-w-md">
              You haven&apos;t enrolled in any courses yet. Explore our catalog and start your learning journey!
            </p>
            <Link href="/courses">
              <Button size="lg" className="mt-2">Explore Courses</Button>
            </Link>
            <Link href="/dashboard/my-courses">
              <Button variant="outline" size="lg" className="mt-2 ml-2">View My Courses</Button>
            </Link>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 border border-surface-border">
          <h2 className="text-xl font-bold text-white mb-6">Profile Details</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shrink-0">
              L
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl font-bold text-white">{user?.fullName || 'Learner'}</h3>
              <p className="text-gray-400 mt-1">{user?.email || 'user@example.com'}</p>
              <div className="mt-4 w-full max-w-xs mx-auto sm:mx-0">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Profile Completion</span>
                  <span>{statsData.profileCompletion}%</span>
                </div>
                <div className="h-2 bg-surface-border rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${statsData.profileCompletion}%` }} />
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Link href="/dashboard/settings">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
