import { create } from "zustand";

type ToastMessage = {
  title: string;
  description?: string;
  type?: "default" | "destructive";
};

type ToastStore = {
  message: null | ToastMessage;
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  message: null,
  showToast: (message: ToastMessage) => set({ message }),
  hideToast: () => set({ message: null }),
}));

export const { showToast, hideToast } = useToastStore.getState();
