import { useCollectionStore } from "../../store/useCollectionStore";

interface CheckBoxProps {
  label: string;
  value: number;
}
export default function CheckBox({ label, value }: CheckBoxProps) {
  const { updateFilter, filterPricingOption } = useCollectionStore();

  return (
    <label>
      <input
        className="pricingCheckbox"
        type="checkbox"
        value={value}
        onClick={() => updateFilter(value)}
        checked={filterPricingOption.includes(value)}
      />
      {label}
    </label>
  );
}
