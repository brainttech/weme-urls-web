import { SignupProps } from "@/features/types";
import { create } from "zustand";

type LinksStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  links: any[];
  setLinks: (links: any[]) => void;
};

export const useLinksStore = create<LinksStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  links: [],
  setLinks: (links: any[]) => set({ links }),
}));
