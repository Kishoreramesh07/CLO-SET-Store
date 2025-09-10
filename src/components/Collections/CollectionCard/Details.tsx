import { getPricingLabel } from "../../../helpers";
import type { collection } from "../../../interfaces/collections";

export default function Details({ collection }: { collection: collection }) {
  return (
    <div className="details-wrapper">
      <div className="details">
        <h4 className="title">{collection?.title}</h4>
        <h5 className="creator">{collection?.creator}</h5>
      </div>
      <h3 className="pricingOption">
        {getPricingLabel({
          price: collection?.price,
          option: collection?.pricingOption,
        })}
      </h3>
    </div>
  );
}
