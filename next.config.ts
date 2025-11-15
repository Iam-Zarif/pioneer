/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pioneer-alpha-website-django-s3-bucket-new-2.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;
