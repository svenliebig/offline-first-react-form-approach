import { useState } from 'react';
import { z } from 'zod';
import {
  personalDataSchema,
  addressSchema,
  parentsSchema,
} from '../types/form';

const schemas = {
  personalData: personalDataSchema,
  address: addressSchema,
  parents: parentsSchema,
};

export function useFormValidation<T>(
  section: keyof typeof schemas,
  data: T | null | undefined
) {
  const [touched, setTouchedFields] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: T) => {
    try {
      schemas[section].parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const setTouched = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  return {
    validate,
    errors,
    touched,
    setTouched,
  };
}