'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { courses } from '@/lib/constants';
import CourseCard from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/Button';

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  // Extract unique categories from array
  const categoriesMap = new Set(courses.map(c => c.category));
  const categories = ['All', ...Array.from(categoriesMap)];
  
  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore <span className="gradient-text">All Courses</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive library of practical, bite-sized courses designed to accelerate your career and personal growth.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-surface-card text-gray-400 hover:bg-surface-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.title}
              id={course.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col h-full"
            >
              <div className="flex-1">
                <CourseCard course={course} />
              </div>
              
              <div className="mt-4 pt-4 border-t border-surface-border glass rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-accent/10 px-2 py-1 rounded">
                  Coming Soon
                </span>
                <Button size="sm" variant="ghost" onClick={() => alert("Mock notification set!")}>
                  🔔 Notify Me
                </Button>
              </div>
            </motion.div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No courses found for this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
