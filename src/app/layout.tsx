import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Sourcing By ZEE',
  description: 'Dedicated to build and supply medical machinery for the last 10 years.',
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
