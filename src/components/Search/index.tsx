import React from "react";
import { useCollectionStore } from "../../store/useCollectionStore";

export default function Search() {
  const { searchQuery, updateSearchQuery } = useCollectionStore();
  return (
    <input
      value={searchQuery}
      onChange={({ target: { value } }) => updateSearchQuery(value)}
    />
  );
}
