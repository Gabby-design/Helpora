import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import EmergencyQuickBar from '@/components/layout/EmergencyQuickBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { Analytics } from '@vercel/analytics/next';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#047857',
};

export const metadata: Metadata = {
  title: 'Helpora | Find Trusted Help Near You • Nigeria',
  description: 'Connect with trusted local professionals, learn with AI study tutors, and find essential emergency healthcare resources in Nigeria — all in one place.',
  keywords: [
    'Helpora',
    'Nigerian services',
    'electrician Abuja',
    'plumber Lagos',
    'mechanic',
    'laptop repair',
    'cleaner',
    'home tutor',
    'trusted Nigerian professionals',
    'emergency hospital navigator',
    'AI study Nigeria'
  ],
  authors: [{ name: 'Helpora Nigeria' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body 
        className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white"
        suppressHydrationWarning
      >
        <AuthProvider>
          <EmergencyQuickBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AuthModal />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
