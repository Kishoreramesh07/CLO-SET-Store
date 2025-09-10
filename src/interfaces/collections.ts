export enum PricingOption {
  Paid = 0,
  Free = 1,
  ViewOnly = 2,
}

export interface collections {
  id: string;
  creator: string;
  imagePath: string;
  title: string;
  pricingOption: PricingOption;
  price: number;
}

