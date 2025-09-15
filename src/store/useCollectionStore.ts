import { create } from "zustand";
import type { collection } from "../interfaces/collections";
import { getFilterState, updateQueryParams } from "../helpers";

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
  searchQuery: string;
  updateSearchQuery: (searchQuery: string) => void;
  sortBy: string;
  sort: (sortBy: string) => void;
}

const getFilteredCollections = (
  filterPricingOption: CollectionState[`filterPricingOption`],
  searchQuery: CollectionState[`searchQuery`],
  sortBy: string,
  collections: CollectionState[`collections`]
) => {
  let filteredCollections = collections;

  if (filterPricingOption.length > 0) {
    filteredCollections = filteredCollections.filter((collection) =>
      filterPricingOption.includes(collection?.pricingOption)
    );
  }

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();
    filteredCollections = filteredCollections.filter(
      (collection) =>
        collection?.creator?.toLowerCase()?.includes(normalizedQuery) ||
        collection?.title?.toLowerCase()?.includes(normalizedQuery)
    );
  }

  if (sortBy === `2`) {
    return [...filteredCollections].sort((a, b) => b.price - a.price);
  }

  if (sortBy === `3`) {
    return [...filteredCollections].sort((a, b) => a.price - b.price);
  }

  return [...filteredCollections].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
};

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  visibleCollections: [],
  loading: false,
  error: null,
  limit: 12,
  filterPricingOption: [],
  searchQuery: "",
  sortBy: `1`,

  fetchCollections: async (api: string) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(api);
      const data = await response.json();

      const { filterPricingOption, searchQuery, sortBy } = getFilterState();

      const filteredCollections = getFilteredCollections(
        filterPricingOption,
        searchQuery,
        sortBy,
        data
      );

      set({
        collections: data,
        visibleCollections: filteredCollections.slice(0, get().limit),
        filterPricingOption,
        searchQuery,
        loading: false,
        sortBy,
      });
    } catch (error) {
      console.error(`failed to fetch store collection`);
    }
  },

  loadMore: async () => {
    const {
      collections,
      visibleCollections,
      limit,
      filterPricingOption,
      searchQuery,
      sortBy,
    } = get();
    const nextLimit = visibleCollections.length + limit;

    const filteredCollections = getFilteredCollections(
      filterPricingOption,
      searchQuery,
      sortBy,
      collections
    );

    //skip infinite load no more content to load
    if(filteredCollections.length <= visibleCollections.length){
      return;
    }

    set({ loading: true });

    const delay = () => new Promise((res) => setTimeout(res, 2000));

    await delay();

    set({
      visibleCollections: filteredCollections.slice(0, nextLimit),
      loading: false,
    });
  },

  updateFilter: (pricingOption: number | null) => {
    const { filterPricingOption, applyFilter } = get();

    if (pricingOption === null) {
      set({ filterPricingOption: [] });
      updateQueryParams(`pricingOption`, "");
      applyFilter();
      return;
    }

    const updatedOptions = filterPricingOption.includes(pricingOption)
      ? filterPricingOption.filter((option) => option !== pricingOption)
      : [...filterPricingOption, pricingOption];

    updateQueryParams(`pricingOption`, updatedOptions);

    set({ filterPricingOption: updatedOptions });
    applyFilter();
  },

  updateSearchQuery: (searchQuery) => {
    const { applyFilter } = get();

    set({ searchQuery });
    updateQueryParams(`search`, searchQuery);

    applyFilter();
  },

  applyFilter: () => {
    const { collections, filterPricingOption, searchQuery, limit, sortBy } =
      get();

    const filteredCollections = getFilteredCollections(
      filterPricingOption,
      searchQuery,
      sortBy,
      collections
    );

    set({ visibleCollections: filteredCollections.slice(0, limit) });
  },

  sort: (sortBy) => {
    set({ sortBy });
    updateQueryParams(`sortBy`, sortBy);
    get().applyFilter();
  },
}));
