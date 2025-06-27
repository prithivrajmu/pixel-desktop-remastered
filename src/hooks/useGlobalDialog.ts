import { create } from 'zustand';

export type DialogType = 'volume' | 'datetime' | 'start' | 'context';

interface DialogState {
  activeDialog: DialogType | null;
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
  closeAllDialogs: () => void;
}

export const useGlobalDialog = create<DialogState>((set) => ({
  activeDialog: null,
  openDialog: (type: DialogType) => set({ activeDialog: type }),
  closeDialog: () => set({ activeDialog: null }),
  closeAllDialogs: () => set({ activeDialog: null }),
})); 