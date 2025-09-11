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

export const updateQueryParams = (paramKey: string, value?: number[] | string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);


  if (Array.isArray(value) && value.length > 0) {
    // to avoid comma encoding while conveting params tostring do it manual
    params.delete(paramKey);
    const otherParams = params.toString();
    const query = `${paramKey}=${value.join(",")}`;
    const finalQuery = otherParams ? `${query}&${otherParams}` : query;

    window.history.pushState({}, "", `${url.pathname}?${finalQuery}`);
    return;
  }

  if (typeof value === "string" && !!value) {
    params.set(paramKey, value);
  } else {
    params.delete(paramKey);
  }

  window.history.pushState({}, "", `${url.pathname}?${params.toString()}`);
};

export const getFilterState = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pricingOption = urlParams.get("pricingOption");

  return {
    filterPricingOption: pricingOption ? pricingOption.split(",").map(Number) : [],
  };
};
