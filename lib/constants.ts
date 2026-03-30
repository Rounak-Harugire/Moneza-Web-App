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
  { title: "AI Fundamentals", category: "Tech", emoji: "🤖", color: "indigo", description: "Learn the basics of AI and machine learning." },
  { title: "Stock Market Mastery", category: "Finance", emoji: "📈", color: "green", description: "Understand how to invest and grow your wealth." },
  { title: "English for Professionals", category: "Language", emoji: "🗣️", color: "blue", description: "Master business English for career growth." },
  { title: "How To Reduce Screentime", category: "Health", emoji: "📵", color: "rose", description: "Digital detox strategies for a healthier life." },
  { title: "Study ka Superhero", category: "Learning", emoji: "📚", color: "yellow", description: "Advanced study techniques and memory hacks." },
  { title: "Health & Wellness", category: "Wellness", emoji: "💪", color: "teal", description: "Fitness, diet, and mental health fundamentals." },
  { title: "Time ka Magic Seekho", category: "Productivity", emoji: "⏰", color: "purple", description: "Master time management and deep work." }
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
