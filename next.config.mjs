import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.atcreations.ca',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.atcreations.ca',
      },
    ],
    loader: 'imgix',
    path: '',
    unoptimized: true,
  }
};

export default withNextIntl(nextConfig);
