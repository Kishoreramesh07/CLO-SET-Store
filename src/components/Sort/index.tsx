import { useCollectionStore } from "../../store/useCollectionStore";

export default function Sort() {
  const { sortBy, sort } = useCollectionStore();

  return (
    <div className="sort-wrapper">
      <label>
        Sort by
        <select
          value={sortBy}
          onChange={({ target: { value } }) => sort(value)}
        >
          <option value="1">Item Name (Default)</option>
          <option value="2">Higher Price</option>
          <option value="3">Lower Price</option>
        </select>
      </label>
    </div>
  );
}
