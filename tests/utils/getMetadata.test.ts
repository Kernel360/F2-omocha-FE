import { META } from '@/static/metadata';
import getMetadata from '@/utils/getMetadata';

describe('getMetadata', () => {
  it('기본 메타데이터를 반환해야 한다', () => {
    const metadata = getMetadata();
    const openGraphImages = metadata.openGraph?.images;
    const twitterImages = metadata.twitter?.images;

    expect(metadata.title).toBe(META.title);
    expect(metadata.description).toBe(META.description);
    expect(metadata.openGraph?.title).toBe(META.title);
    expect(metadata.openGraph?.description).toBe(META.description);

    // openGraph의 images의 타입은 'OGImage | Array<OGImage>'이기 때문에 배열인지 아닌지 확인해야 함
    if (Array.isArray(openGraphImages)) {
      if (
        openGraphImages[0] &&
        typeof openGraphImages[0] !== 'string' &&
        'url' in openGraphImages[0]
      ) {
        expect(openGraphImages[0].url).toBe(META.ogImage);
      }
    } else if (openGraphImages) {
      if (typeof openGraphImages !== 'string' && 'url' in openGraphImages) {
        expect(openGraphImages.url).toBe(META.ogImage);
      }
    }

    // twitter도 동일
    if (Array.isArray(twitterImages)) {
      if (twitterImages[0] && typeof twitterImages[0] !== 'string' && 'url' in twitterImages[0]) {
        expect(twitterImages[0].url).toBe(META.ogImage);
      }
    } else if (twitterImages) {
      if (typeof twitterImages !== 'string' && 'url' in twitterImages) {
        expect(twitterImages.url).toBe(META.ogImage);
      }
    }

    expect(metadata.alternates?.canonical).toBe('');
  });

  it('커스텀 제목과 설명을 포함한 메타데이터를 반환해야 한다', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description',
    };

    const metadata = getMetadata(customProps);
    const openGraphImages = metadata.openGraph?.images;
    const twitterImages = metadata.twitter?.images;

    expect(metadata.title).toBe(`${customProps.title} | OMOCHA`);
    expect(metadata.description).toBe(customProps.description);
    expect(metadata.openGraph?.title).toBe(`${customProps.title} | OMOCHA`);
    expect(metadata.openGraph?.description).toBe(customProps.description);

    if (Array.isArray(openGraphImages)) {
      if (
        openGraphImages[0] &&
        typeof openGraphImages[0] !== 'string' &&
        'url' in openGraphImages[0]
      ) {
        expect(openGraphImages[0].url).toBe(META.ogImage);
      }
    } else if (openGraphImages) {
      if (typeof openGraphImages !== 'string' && 'url' in openGraphImages) {
        expect(openGraphImages.url).toBe(META.ogImage);
      }
    }

    if (Array.isArray(twitterImages)) {
      if (twitterImages[0] && typeof twitterImages[0] !== 'string' && 'url' in twitterImages[0]) {
        expect(twitterImages[0].url).toBe(META.ogImage);
      }
    } else if (twitterImages) {
      if (typeof twitterImages !== 'string' && 'url' in twitterImages) {
        expect(twitterImages.url).toBe(META.ogImage);
      }
    }
    expect(metadata.alternates?.canonical).toBe('');
  });

  it('커스텀 URL과 OG 이미지를 포함한 메타데이터를 반환해야 한다', () => {
    const customProps = {
      asPath: '/custom-path',
      ogImage: 'opengraph-image.png',
    };

    const metadata = getMetadata(customProps);
    const openGraphImages = metadata.openGraph?.images;
    const twitterImages = metadata.twitter?.images;

    expect(metadata.alternates?.canonical).toBe(customProps.asPath);
    expect(metadata.openGraph?.url).toBe(customProps.asPath);
    if (Array.isArray(openGraphImages)) {
      if (
        openGraphImages[0] &&
        typeof openGraphImages[0] !== 'string' &&
        'url' in openGraphImages[0]
      ) {
        expect(openGraphImages[0].url).toBe(META.ogImage);
      }
    } else if (openGraphImages) {
      if (typeof openGraphImages !== 'string' && 'url' in openGraphImages) {
        expect(openGraphImages.url).toBe(META.ogImage);
      }
    }

    if (Array.isArray(twitterImages)) {
      if (twitterImages[0] && typeof twitterImages[0] !== 'string' && 'url' in twitterImages[0]) {
        expect(twitterImages[0].url).toBe(META.ogImage);
      }
    } else if (twitterImages) {
      if (typeof twitterImages !== 'string' && 'url' in twitterImages) {
        expect(twitterImages.url).toBe(META.ogImage);
      }
    }
  });

  it('커스텀 제목, 설명, URL, OG 이미지를 포함한 메타데이터를 반환해야 한다', () => {
    const customProps = {
      title: 'Full Custom Title',
      description: 'Full Custom Description',
      asPath: '/full-custom-path',
      ogImage: 'opengraph-image.png',
    };

    const metadata = getMetadata(customProps);
    const openGraphImages = metadata.openGraph?.images;
    const twitterImages = metadata.twitter?.images;

    expect(metadata.title).toBe(`${customProps.title} | OMOCHA`);
    expect(metadata.description).toBe(customProps.description);
    expect(metadata.alternates?.canonical).toBe(customProps.asPath);
    expect(metadata.openGraph?.title).toBe(`${customProps.title} | OMOCHA`);
    expect(metadata.openGraph?.description).toBe(customProps.description);
    expect(metadata.openGraph?.url).toBe(customProps.asPath);
    expect(metadata.twitter?.title).toBe(`${customProps.title} | OMOCHA`);
    expect(metadata.twitter?.description).toBe(customProps.description);

    if (Array.isArray(openGraphImages)) {
      if (
        openGraphImages[0] &&
        typeof openGraphImages[0] !== 'string' &&
        'url' in openGraphImages[0]
      ) {
        expect(openGraphImages[0].url).toBe(META.ogImage);
      }
    } else if (openGraphImages) {
      if (typeof openGraphImages !== 'string' && 'url' in openGraphImages) {
        expect(openGraphImages.url).toBe(META.ogImage);
      }
    }

    if (Array.isArray(twitterImages)) {
      if (twitterImages[0] && typeof twitterImages[0] !== 'string' && 'url' in twitterImages[0]) {
        expect(twitterImages[0].url).toBe(META.ogImage);
      }
    } else if (twitterImages) {
      if (typeof twitterImages !== 'string' && 'url' in twitterImages) {
        expect(twitterImages.url).toBe(META.ogImage);
      }
    }
  });
});
