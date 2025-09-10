import { useCollectionStore } from "../../store/useCollectionStore";
import CheckBox from "./CheckBox";

export default function Filter() {
  const PricingOptionMap = {
    "Paid": 0,
    "Free": 1,
    "View Only": 2,
  };

  const { updateFilter } = useCollectionStore();

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="pricing-option-wrapper">
          <p>Pricing Option</p>
          <div className="option-checkbox">
            {Object.entries(PricingOptionMap).map(([label, value]) => (
              <CheckBox key={value} label={label} value={value} />
            ))}
          </div>
        </div>
        <button type="button" onClick={() => updateFilter(null)}>
          RESET
        </button>
      </div>
    </div>
  );
}
