import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
}

const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useCounter;
