import Link from 'next/link';
import { Zap, Globe, MessageCircle, Share2, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-accent/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-accent fill-accent" />
              <span className="text-2xl font-bold gradient-text tracking-tight">Moneza</span>
            </Link>
            <p className="text-gray-400 font-medium">Learn. Earn. Rise.</p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-card hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-card hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-card hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-card hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-primary-light transition-colors">All Courses</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary-light transition-colors">Contact</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-primary-light transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-primary-light transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary-light transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary-light transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>support@monezatech.com</li>
              <li>+91-9146569726</li>
              <li className="pt-2 text-sm max-w-[200px] leading-relaxed">
                70/3 Madina Colony, Akot, Maharashtra - 444101, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 Moneza Technologies Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
