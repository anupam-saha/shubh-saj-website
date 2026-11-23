import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SHUBHSAJ | Wedding Gift Trays, Hampers & Floral Decor in Durgapur',
  description: 'Elegant, customised wedding gift trays, premium hampers and floral decorations in Durgapur and nearby areas. Luxury looks at affordable prices.',
  openGraph: { title: 'SHUBHSAJ — সাজে থাকুক প্রতিটি শুভ মুহূর্ত', description: 'Thoughtful details. Beautiful celebrations. Made with love in Durgapur.', images: ['/images/logo.webp'] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
