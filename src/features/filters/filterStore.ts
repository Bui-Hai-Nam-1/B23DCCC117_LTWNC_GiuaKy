import { create } from "zustand";
import type { BookCategory } from "../books/booksTypes";

interface FilterState {
  search: string;
  category: BookCategory | "Tất cả";
  setSearch: (search: string) => void;
  setCategory: (category: BookCategory | "Tất cả") => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  category: "Tất cả",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}));