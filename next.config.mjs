// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 's3.ap-northeast-2.amazonaws.com',
      //   port: '',
      //   pathname: '/omocha.storages/**',
      // },
      {
        protocol: 'https',
        hostname: 'd3dwom6xle09jw.cloudfront.net',
        port: '',
        pathname: '/auction/upload/images/**',
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

// console.error와 console.warn은 유지되고, 나머지 console 호출은 제거
if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  };
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
