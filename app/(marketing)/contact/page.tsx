'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-gray-400">
            Have a question about our courses? Want to partner with us? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left Col: Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-6 flex flex-col items-start text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Us</h3>
                  <p className="text-gray-400 mt-1">support@monezatech.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Call Us</h3>
                  <p className="text-gray-400 mt-1">+91-9146569726</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Headquarters</h3>
                  <p className="text-gray-400 mt-1 leading-relaxed">
                    70/3 Madina Colony,<br/>
                    Akot, Maharashtra - 444101,<br/>
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Form */}
          <div className="glass rounded-3xl p-8 md:p-10 border-t border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Your Name" required />
              <Input label="Email Address" type="email" required />
              <Input label="Subject" required />
              
              <div className="relative w-full mb-6 text-left">
                <textarea 
                  required
                  className="peer w-full h-32 rounded-lg bg-surface-card border border-surface-border transition-colors pt-5 pb-2 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder=" "
                ></textarea>
                <label className="absolute text-sm text-gray-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary top-1.5 left-4 text-xs">
                  Your Message
                </label>
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full flex items-center justify-center gap-2" type="submit">
                  {status === 'success' ? 'Message Sent!' : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-3xl glass h-[400px] border border-surface-border overflow-hidden flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50 text-surface-border" />
            <span className="text-xl font-bold">Google Maps Embed Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
