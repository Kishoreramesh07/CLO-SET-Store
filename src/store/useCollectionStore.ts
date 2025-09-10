import { create } from "zustand";
import type { collections } from "../interfaces/collections";

interface CollectionState {
  collections: collections[];
  loading: boolean;
  error: string | null;
  fetchCollections: (api: string) => Promise<void>;
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  loading: false,
  error: null,

  fetchCollections: async (api: string) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(api);
      const data = await response.json();

      set({ collections: data, loading: false });
    } catch (error) {
      console.error(`failed to fetch store collection`);
    }
  },
}));
