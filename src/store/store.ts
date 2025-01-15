import { create, createStore } from "zustand";

type Form = {
  name: string;
};

type Store<T extends Record<string, unknown>> = {
  form: Partial<T>;
  updateForm: (form: Partial<T>) => void;
  pendingUpdates: Partial<T>;
  clearPendingUpdates: () => void;
  setPendingUpdates: (updates: Partial<T>) => void;
};

export function createFormStore<T extends Record<string, unknown>>() {
  return createStore<Store<T>>((set) => ({
    form: {},
    updateForm: (form) => set({ form }),
    pendingUpdates: {},
    clearPendingUpdates: () => set({ pendingUpdates: {} }),
    setPendingUpdates: (updates) => set({ pendingUpdates: updates }),
  }));
}

export const useFormStore = create<Store<Form>>((set) => ({
  form: {},
  pendingUpdates: {},
  updateForm: (update) => {
    set((state) => ({
      form: { ...state.form, ...update },
      pendingUpdates: { ...state.pendingUpdates, ...update },
    }));
  },
  clearPendingUpdates: () => set({ pendingUpdates: {} }),
  setPendingUpdates: (updates) => set({ pendingUpdates: updates }),
}));
