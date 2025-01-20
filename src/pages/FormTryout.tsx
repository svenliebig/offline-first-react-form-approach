import { useEffect, useRef } from "react";
import { FieldInput } from "../components/form/FieldInput";
import { useFormStore } from "../store/store";

export default function FormTryout() {
  return (
    <div className="mt-36">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Tryout</h1>
      <FieldInput name="name" label="Name" />
      <FieldInput name="surname" label="Surname" />
      <FieldInput name="age" label="Age" />
      <Spy />
      <Updater />
    </div>
  );
}

function Spy() {
  const state = useFormStore((state) => state);
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}

function useUpdater() {
  const pendingUpdates = useFormStore((state) => state.pendingUpdates);
  const clearPendingUpdates = useFormStore(
    (state) => state.clearPendingUpdates
  );

  const timeRef = useRef<NodeJS.Timeout>();
  const processingUpdatesRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (Object.keys(pendingUpdates).length === 0) {
      return;
    }

    // Only start a new update cycle if we're not already processing updates
    if (Object.keys(processingUpdatesRef.current).length === 0) {
      // Capture the current updates to process

      timeRef.current = setTimeout(async () => {
        processingUpdatesRef.current = { ...pendingUpdates };

        await pretendToSendToBackend();

        // Only clear the updates that were part of this batch
        const updatesToKeep = diffProcessedUpdatesToPendingUpdates(
          processingUpdatesRef.current
        );
        // Clear all updates and then restore the ones that came in during processing
        clearPendingUpdates();
        if (Object.keys(updatesToKeep).length > 0) {
          // Note: You'll need to add a method to restore pending updates in your store
          useFormStore.getState().setPendingUpdates(updatesToKeep);
        }

        processingUpdatesRef.current = {};
      }, 5000);
    }

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, [clearPendingUpdates, pendingUpdates]);
}

function Updater() {
  useUpdater();

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Pending Updates</h3>
      {/* <p className="text-gray-600 mb-2">{state}</p>
      <pre>{JSON.stringify(pendingUpdates, null, 2)}</pre>
      <pre>{JSON.stringify(processingUpdatesRef.current, null, 2)}</pre> */}
    </>
  );
}

function diffProcessedUpdatesToPendingUpdates(
  sendUpdates: Record<string, any>
) {
  const currentPendingUpdates = useFormStore.getState().pendingUpdates;
  const updatesToKeep = Object.keys(currentPendingUpdates).reduce(
    (acc, key) => {
      if (
        !hasKey(sendUpdates, key) ||
        sendUpdates[key] !== currentPendingUpdates[key]
      ) {
        acc[key] = currentPendingUpdates[key];
      }
      return acc;
    },
    {} as Record<string, any>
  );
  return updatesToKeep;
}

async function pretendToSendToBackend() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

function hasKey(object: Record<string, unknown>, keyname: string) {
  return Object.prototype.hasOwnProperty.call(object, keyname);
}
