import { useCallback, useEffect, useRef, useState } from "react";
import { useFormStore } from "../../store/store";
import { createAt, getIn } from "../../utils/object";

export function useThrottledFormStoreField(name: string) {
  const updateForm = useFormStore((state) => state.updateForm);
  const formValue = useFormStore((state) => getIn(state.form, name));

  const [stateValue, setValue] = useState(formValue);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffectOnSecondRender(() => {
    timerRef.current = setTimeout(() => {
      updateForm(createAt(name, stateValue));
    }, 200);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [name, stateValue, updateForm]);

  useEffectOnSecondRender(() => {
    setValue(formValue);
  }, [formValue]);

  return {
    value: stateValue,
    updateForm: setValue,
  };
}

export function useFormStoreField(name: string) {
  const value = useFormStore((state) => getIn(state.form, name));
  const updateForm = useFormStore((state) => state.updateForm);

  return {
    value,
    updateForm: useCallback(
      (value: string) => updateForm(createAt(name, value)),
      [updateForm, name]
    ),
  };
}

function useEffectOnSecondRender(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      effect();
    } else {
      hasMounted.current = true;
    }
  }, deps);
}
