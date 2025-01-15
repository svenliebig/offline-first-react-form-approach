import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Form } from "../types/form";

interface FormState {
  forms: Form[];
  currentForm: Form | null;
  pendingUpdates: Record<string, Partial<Form>>;
  setForms: (forms: Form[]) => void;
  setCurrentForm: (form: Form | null) => void;
  updateForm: (formId: string, updates: Partial<Form>) => void;
  addPendingUpdate: (formId: string, updates: Partial<Form>) => void;
  clearPendingUpdates: (formId: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      forms: [],
      currentForm: null,
      pendingUpdates: {},
      setForms: (forms) => set({ forms }),
      setCurrentForm: (form) => set({ currentForm: form }),
      updateForm: (formId, updates) =>
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId ? { ...form, ...updates } : form
          ),
          currentForm:
            state.currentForm?.id === formId
              ? { ...state.currentForm, ...updates }
              : state.currentForm,
        })),
      addPendingUpdate: (formId, updates) =>
        set((state) => ({
          pendingUpdates: {
            ...state.pendingUpdates,
            [formId]: {
              ...state.pendingUpdates[formId],
              ...updates,
            },
          },
        })),
      clearPendingUpdates: (formId) =>
        set((state) => {
          const { [formId]: _, ...rest } = state.pendingUpdates;
          return { pendingUpdates: rest };
        }),
    }),
    {
      name: "form-storage",
    }
  )
);
