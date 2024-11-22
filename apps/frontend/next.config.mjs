import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", 
});

export default withPWA({
  reactStrictMode: true,
  images: {
    domains: ["v2.exercisedb.io", "res.cloudinary.com"], // Corrección aquí
  },
  experimental: {
    esmExternals: false, 
  },
  pwa: {
    register: true,
    skipWaiting: true,
    debug: true, 
    mode: process.env.NODE_ENV === "production" ? "production" : "development", 
  },
});
