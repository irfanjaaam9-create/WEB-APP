import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyMobileBar from '@/components/layout/StickyMobileBar';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Source by Zahid | China Sourcing & Machinery Procurement',
  description:
    'Your sourcing partner on the ground in China. We assist international buyers with supplier research, quotation comparison, sample coordination, and machinery procurement.',
  keywords:
    'China sourcing agent, China procurement service, source products from China, Chinese factory sourcing, China machinery sourcing, supplier research China',
  openGraph: {
    title: 'Source by Zahid | China Sourcing & Machinery Procurement',
    description:
      'Find suitable Chinese suppliers, compare quotations, and communicate with factories with practical local support on the ground in China.',
    type: 'website',
    url: 'https://sourcebyzahid.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundColor: '#f5f5f4',
          color: '#1c1917',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          overflowX: 'hidden',
          paddingBottom: '64px',
        }}
        className="sm:!pb-0"
      >
        <JsonLd />
        <Header />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
        <StickyMobileBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
