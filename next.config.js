/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "vmdi8qakqy5un7sl.public.blob.vercel-storage.com",
          port: "",
          pathname: "/images/**",
        },
      ],
    },
  };