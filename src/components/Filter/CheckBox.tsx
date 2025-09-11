import { useCollectionStore } from "../../store/useCollectionStore";

interface CheckBoxProps {
  label: string;
  value: number;
}
export default function CheckBox({ label, value }: CheckBoxProps) {
  const { updatePricingFilter, filterPricingOption } = useCollectionStore();

  return (
    <label>
      <input
        className="pricingCheckbox"
        type="checkbox"
        value={value}
        onChange={() => updatePricingFilter(value)}
        checked={filterPricingOption.includes(value)}
      />
      {label}
    </label>
  );
}
