import { useCollectionStore } from "../../store/useCollectionStore";
import SearchIcon from "./SearchIcon";

export default function Search() {
  const { searchQuery, updateSearchQuery } = useCollectionStore();
  return (
    <div className="search-wrapper">
      <input
        value={searchQuery}
        onChange={({ target: { value } }) => updateSearchQuery(value)}
        placeholder="Find the Items you're looking for"
      />
      <SearchIcon />
    </div>
  );
}
