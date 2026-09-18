import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import EmergencyQuickBar from '@/components/layout/EmergencyQuickBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Helpora | Find Trusted Help Near You',
  description: 'Connect with trusted local professionals, learn with AI, and find essential health and community resources in Nigeria — all in one place.',
  keywords: ['Helpora', 'Nigerian services', 'electrician', 'plumber', 'mechanic', 'phone repair', 'cleaner', 'tutor', 'Abuja', 'Lagos', 'trusted professionals', 'AI study'],
  authors: [{ name: 'Helpora Nigeria' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-600 selection:text-white">
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
