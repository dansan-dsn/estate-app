import { create } from "zustand";

type SnackbarState = {
  visible: boolean;
  message: string;
  color?: string;
  actionLabel?: string;
  onAction?: () => void;
  showSnackbar: (
    message: string,
    color?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => void;
  hideSnackbar: () => void;
};

export const useSnackbar = create<SnackbarState>((set) => ({
  visible: false,
  message: "",
  color: undefined,
  actionLabel: undefined,
  onAction: undefined,
  showSnackbar: (message, color, actionLabel, onAction) =>
    set({ visible: true, message, color, actionLabel, onAction }),
  hideSnackbar: () =>
    set({
      visible: false,
      message: "",
      color: undefined,
      actionLabel: undefined,
      onAction: undefined,
    }),
}));
