import { create } from "zustand";

type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  open: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccountState = create<OpenAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  open: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
