export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Courses', 
    href: '/courses',
    dropdown: [
      { name: 'AI Fundamentals', href: '/courses#ai' },
      { name: 'Stock Market Mastery', href: '/courses#finance' },
      { name: 'English for Professionals', href: '/courses#language' },
      { name: 'Health & Wellness', href: '/courses#wellness' },
      { name: 'Study ka Superhero', href: '/courses#learning' },
      { name: 'Time ka Magic Seekho', href: '/courses#productivity' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export const courses = [
  // AI
  { 
    _id: "course_ai_1", 
    title: "AI Fundamentals", 
    category: "Tech", 
    emoji: "🤖", 
    color: "indigo", 
    description: "Learn the basics of AI and machine learning.", 
    isAvailable: true,
    subCourses: [
      { _id: "ai_basic", title: "Basics of AI", isEnrollEnabled: true },
      { _id: "ai_advanced", title: "Advanced AI", isEnrollEnabled: false }
    ]
  },
  { 
    _id: "course_ai_2", 
    title: "Machine Learning Basics", 
    category: "Tech", 
    emoji: "🧠", 
    color: "indigo", 
    description: "Understand core ML algorithms.", 
    isAvailable: false, 
    subCourses: [] 
  },
  { 
    _id: "course_ai_3", 
    title: "Deep Learning Advanced", 
    category: "Tech", 
    emoji: "🧬", 
    color: "indigo", 
    description: "Build neural networks.", 
    isAvailable: false, 
    subCourses: [] 
  },
  
  // Finance
  { 
    _id: "course_fin_1", 
    title: "Stock Market Mastery", 
    category: "Finance", 
    emoji: "📈", 
    color: "green", 
    description: "Understand how to invest and grow your wealth.", 
    isAvailable: true, 
    subCourses: [] 
  },
  { 
    _id: "course_fin_2", 
    title: "Crypto Basics", 
    category: "Finance", 
    emoji: "💎", 
    color: "green", 
    description: "Learn about blockchain tech.", 
    isAvailable: false, 
    subCourses: [] 
  },

  // Language
  { 
    _id: "course_lang_1", 
    title: "English for Professionals", 
    category: "Language", 
    emoji: "🗣️", 
    color: "blue", 
    description: "Master business English for career growth.", 
    isAvailable: true, 
    subCourses: [] 
  },

  // Health
  { 
    _id: "course_health_1", 
    title: "How To Reduce Screentime", 
    category: "Health", 
    emoji: "📵", 
    color: "rose", 
    description: "Digital detox strategies for a healthier life.", 
    isAvailable: false,
    subCourses: []
  },

  // Learning
  { 
    _id: "course_learn_1", 
    title: "Study ka Superhero", 
    category: "Learning", 
    emoji: "📚", 
    color: "yellow", 
    description: "Advanced study techniques and memory hacks.", 
    isAvailable: true,
    subCourses: []
  },

  // Wellness
  { 
    _id: "course_well_1", 
    title: "Health & Wellness", 
    category: "Wellness", 
    emoji: "💪", 
    color: "teal", 
    description: "Fitness, diet, and mental health fundamentals.", 
    isAvailable: false,
    subCourses: []
  },

  // Productivity
  { 
    _id: "course_prod_1", 
    title: "Time Management", 
    category: "Productivity", 
    emoji: "⏰", 
    color: "purple", 
    description: "Master time management and deep work.", 
    isAvailable: true,
    subCourses: []
  }
];

export const testimonials = [
  { name: "Rahul S.", city: "Mumbai", quote: "Moneza changed my career trajectory. The AI course was incredibly practical.", initials: "RS" },
  { name: "Priya M.", city: "Pune", quote: "The English communication course gave me the confidence to ace my interviews.", initials: "PM" },
  { name: "Amit K.", city: "Delhi", quote: "Best investment I made! The finance course is a must for every beginner.", initials: "AK" }
];

export const features = [
  { icon: "Zap", title: "Fast Learning", description: "Micro-lessons designed for busy schedules." },
  { icon: "Award", title: "Verified Certs", description: "Get certificates that employers actually value." },
  { icon: "TrendingUp", title: "Career Growth", description: "Practical skills that directly impact your earning potential." },
  { icon: "Users", title: "Community Driven", description: "Learn alongside ambitious peers from across India." }
];

export const howItWorks = [
  { step: 1, title: "Share Referral Code", description: "Get your unique referral link from your dashboard." },
  { step: 2, title: "Friends Sign Up", description: "Share it with friends and they get a sign-up bonus." },
  { step: 3, title: "Earn Rewards", description: "Earn cash or premium unlocks for every successful referral." }
];
