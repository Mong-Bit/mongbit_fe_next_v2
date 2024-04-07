/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@mongbit/ui'],
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
};
