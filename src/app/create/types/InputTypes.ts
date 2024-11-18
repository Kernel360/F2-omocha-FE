export type ImageUpload = {
  file: File;
};

export type AuctionInputs = {
  nameRequired: string;
  startPriceRequired: string;
  bidUnitRequired: string;
  imagesRequired: ImageUpload[];
  contentRequired: string;
  startDateRequired: string;
  endDateRequired: string;
  instantBuyPrice: number | null;
  category_ids: number[];
};
