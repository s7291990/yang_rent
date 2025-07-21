import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
    // 필요하다면 tsconfig 위치 지정 (기본값: ./tsconfig.json)
    // tsconfigPath: "./tsconfig.json",
  },

  // ✅ ESLint 오류도 빌드 실패로 처리하지 않기 (선택)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
