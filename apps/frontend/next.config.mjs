import withPWA from "@ducanh2912/next-pwa";

export default withPWA({
  reactStrictMode: true,
  images: {
    domains: ["v2.exercisedb.io", "res.cloudinary.com", "image.cdn2.seaart.me"], 
  },
  pwa: {
    dest: "public", 
    register: true,
    skipWaiting: true,
    debug: true,
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
  },
  experimental: {
    esmExternals: false, 
  },
});
