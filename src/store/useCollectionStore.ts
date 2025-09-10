import { create } from "zustand";
import type { collection } from "../interfaces/collections";

interface CollectionState {
  collections: collection[];
  visibleCollections: collection[];
  loading: boolean;
  error: string | null;
  limit: number;
  fetchCollections: (api: string) => Promise<void>;
  loadMore: () => void;
  filterPricingOption: number[];
  updateFilter: (pricingOption: number | null) => void;
  applyFilter: () => void;
}

const getFilteredCollections = (
  filterPricingOption: CollectionState[`filterPricingOption`],
  collections: CollectionState[`collections`]
) => {
  const filteredCollections =
    filterPricingOption.length > 0
      ? collections.filter((collection) =>
          filterPricingOption.includes(collection.pricingOption)
        )
      : collections;
  return filteredCollections;
};

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  visibleCollections: [],
  loading: false,
  error: null,
  limit: 12,
  filterPricingOption: [],

  fetchCollections: async (api: string) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(api);
      const data = await response.json();

      set({
        collections: data,
        visibleCollections: data.slice(0, get().limit),
        loading: false,
      });
    } catch (error) {
      console.error(`failed to fetch store collection`);
    }
  },

  loadMore: () => {
    const { collections, visibleCollections, limit, filterPricingOption } =
      get();
    const nextLimit = visibleCollections.length + limit;

    const filteredCollections = getFilteredCollections(
      filterPricingOption,
      collections
    );

    set({ visibleCollections: filteredCollections.slice(0, nextLimit) });
  },

  updateFilter: (pricingOption: number | null) => {
    const { filterPricingOption, applyFilter } = get();

    if (pricingOption === null) {
      set({ filterPricingOption: [] });
      applyFilter();
      return;
    }

    const updatedOptions = filterPricingOption.includes(pricingOption)
      ? filterPricingOption.filter((option) => option !== pricingOption)
      : [...filterPricingOption, pricingOption];

    set({ filterPricingOption: updatedOptions });
    applyFilter();
  },

  applyFilter: () => {
    const { collections, filterPricingOption, limit } = get();

    const filteredCollections = getFilteredCollections(
      filterPricingOption,
      collections
    );

    set({ visibleCollections: filteredCollections.slice(0, limit) });
  },
}));
