/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = withInterceptStdout({
  reactStrictMode: false,
  swcMinify: true,
  // pageExtensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text),
)

module.exports = nextConfig
