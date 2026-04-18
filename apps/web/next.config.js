/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma is resolved from workspace packages/db; keep the runtime out of the bundle.
  serverExternalPackages: ["@prisma/client", "db"],
};

export default nextConfig;
