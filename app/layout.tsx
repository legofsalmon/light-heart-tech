import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'Lightheart — Technical Specification',
    template: '%s | Lightheart',
  },
  description:
    'Technical specification portal for the Lightheart immersive AV installation at Usher\'s Island, Dublin. Projection, audio, network, and venue design.',
  keywords: [
    'Lightheart',
    'immersive experience',
    'AV installation',
    'technical specification',
    'projection mapping',
    'L-ISA audio',
    'Dublin',
  ],
  authors: [{ name: 'IDIRNET' }],
  creator: 'IDIRNET',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    siteName: 'Lightheart Tech Spec',
    title: 'Lightheart — Technical Specification',
    description:
      'Technical specification portal for the Lightheart immersive AV installation at Usher\'s Island, Dublin.',
  },
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL('https://light-heart-tech-nu.vercel.app'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f5f5f0' },
  ],
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
