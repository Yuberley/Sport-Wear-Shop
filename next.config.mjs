/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ycccqacoxogaexuxrjkm.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },  
};

export default nextConfig;
