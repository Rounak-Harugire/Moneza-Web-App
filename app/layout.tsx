import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moneza | Learn. Earn. Rise.',
  description: "India's Next-Gen Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-surface text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
