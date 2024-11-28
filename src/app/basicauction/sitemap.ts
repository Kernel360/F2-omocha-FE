import { MetadataRoute } from 'next';

import { AuctionData } from '@/apis/types/basicAuction';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const basicAuction = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auctions?title=&sort=createdAt&direction=DESC&page=0&size=50000`,
    )
      .then(res => res.json())
      .then(jsonRes => jsonRes.result_data.content);

    return basicAuction.map((product: AuctionData) => ({
      url: `https://www.omocha-auction.com/basicauction/${product.auction_id}`,
      lastModified: product.created_at,
    }));
  } catch (error) {
    console.error('error :', error);
  }
  return [];
}
