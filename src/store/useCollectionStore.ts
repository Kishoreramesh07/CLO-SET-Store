import { create } from "zustand";
import type { collections } from "../interfaces/collections";

interface CollectionState {
  collections: collections[];
  visibleCollections: collections[];
  loading: boolean;
  error: string | null;
  limit: number;
  fetchCollections: (api: string) => Promise<void>;
  loadMore: () => void;
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  visibleCollections: [],
  loading: false,
  error: null,
  limit: 12,

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
    const { collections, visibleCollections, limit } = get();
    const nextLimit = visibleCollections.length + limit;

    set({ visibleCollections: collections.slice(0, nextLimit) });
  },
}));
