import { Metadata } from 'next';

import { META } from '@/static/metadata';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

function getMetadata(metadataProps?: GenerateMetadataProps) {
  const { title, description, asPath, ogImage } = metadataProps || {};
  const TITLE = title ? `${title} | OMOCHA` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath || '';
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    // verification: { //TODO 나중에 포털에서 받은거 넣기
    //   google: META.googleVerification,
    //   other: {
    //     'naver-site-verification': META.naverVerification,
    //   },
    // },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
}

export default getMetadata;
