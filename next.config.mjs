/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'en',
    localeDetection: false

  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['beneshtyapi.geniussystemapi.com', 'adminapi.beneshty.com', 'admin.kokyandgody.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'admin.kokyandgody.com',
      },
    ],
/*     unoptimized: true,
 */  },
};
export default nextConfig;
