/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.adidas.com'],
  },
  webpack: (config) => {
    config.module.rules
        .find(({oneOf}) => !!oneOf).oneOf
        .filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
        .reduce((acc, {use}) => acc.concat(use), [])
        .forEach(({options}) => {
          if (options.modules) {
            options.modules.exportLocalsConvention = 'camelCase';
          }
        });
    return config;
  },
}

module.exports = nextConfig
