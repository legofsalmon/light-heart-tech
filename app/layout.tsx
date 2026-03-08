import type { Metadata } from 'next';
import Providers from './providers';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Lightheart — Immersive Experience',
  description: 'Technical specification for the Lightheart immersive AV installation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
