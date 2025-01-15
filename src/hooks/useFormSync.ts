import { useEffect, useRef } from "react";
import { updateForm } from "../api/forms";
import { useFormStore } from "../store/formStore";
import { Form } from "../types/form";

export function useFormSync(formId: string) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();
  const {
    pendingUpdates,
    clearPendingUpdates,
    addPendingUpdate,
    updateForm: updateFormLocally,
  } = useFormStore();

  useEffect(() => {
    console.log("useEffect called");
    const syncChanges = async () => {
      console.log("sync changes");
      const updates = pendingUpdates[formId];
      console.log("sync changes", updates);
      if (!updates) return;

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), 5000);
        });

        const updatePromise = updateForm(formId, updates);

        await Promise.race([timeoutPromise, updatePromise]);
        clearPendingUpdates(formId);
      } catch (error) {
        console.error("Failed to sync changes:", error);
        // Keep the failed updates for the next sync attempt
      }
    };

    console.log("pendingUpdates", pendingUpdates[formId]);
    if (pendingUpdates[formId]) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      timeoutRef.current = setTimeout(syncChanges, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [formId, pendingUpdates, clearPendingUpdates]);

  const updateFormData = (updates: Partial<Form>) => {
    updateFormLocally(formId, updates);
    addPendingUpdate(formId, updates);
  };

  return { updateFormData };
}
