import { create } from 'zustand';

interface LoadingStore {
  isFirstLoad: boolean,
  setIsFirstLoad: (value: boolean) => void,
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isFirstLoad: true,
  setIsFirstLoad: (value: boolean) => set({ isFirstLoad: value }),
}));

export default useLoadingStore