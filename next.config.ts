import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SCSS is supported out of the box with the `sass` package installed
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
