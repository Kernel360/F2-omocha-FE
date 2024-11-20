// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true, // experimental 설정 추가 .babelrc.js 설정을 무시하고 SWC로 변환
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/omocha.storages/**',
      },
    ],
    domains: ['imgstatic.10x10.co.kr', 'via.placeholder.com'], // 허용할 도메인 추가
  },
  webpack: config => {
    // SVG 파일 처리 설정
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
