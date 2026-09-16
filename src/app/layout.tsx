import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'ZOY Medical Technology',
  description: 'Dedicated to Oxygen Generation For 10+ Years. Medical PSA oxygen generators and oxygen chambers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
