// store/categoriesStore.ts
import { create } from "zustand";
import { CategoriesData } from "@/types/Categories";

interface CategoriesState {
  categories: CategoriesData[];
  setCategories: (cats: CategoriesData[]) => void;
  updateCategory: (updatedCat: CategoriesData) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (cats) => set({ categories: cats }),
  updateCategory: (updatedCat) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === updatedCat.id ? updatedCat : cat
      ),
    })),
}));
