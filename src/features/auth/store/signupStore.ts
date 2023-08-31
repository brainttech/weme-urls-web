import { SignupProps } from "@/features/types";
import { create } from "zustand";

type SignupStore = {
  loading: boolean;

  setLoading: (loading: boolean) => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
