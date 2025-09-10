import { PricingOption } from "../interfaces/collections";

export const getPricingLabel = ({
  price,
  option,
}: {
  price: number;
  option: PricingOption;
}) => {
  switch (option) {
    case PricingOption.Paid:
      return `$ ${price}`;
    case PricingOption.Free:
      return "Free";
    case PricingOption.ViewOnly:
      return "View Only";
    default:
      return "";
  }
};

export function debounce(func: () => void, delay: number) {
  let timeoutId: number | undefined;
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
}
