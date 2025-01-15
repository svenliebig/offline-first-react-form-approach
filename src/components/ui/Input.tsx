import { ChangeEvent, useCallback, useMemo } from "react";

interface InputProps {
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: () => void;
  className?: string;
  validationError?: string;
  invalid?: boolean;
  id?: string;
  containerClassName?: string;
}

export function Input({
  label,
  onChange,
  value = "",
  onBlur,
  className = "",
  validationError,
  invalid = false,
  id: providedId,
  containerClassName = "",
}: InputProps) {
  const id = useMemo(
    () => providedId || Math.random().toString(36).slice(2, 11),
    [providedId]
  );

  const inputClassName = useCallback(() => {
    const baseClasses =
      "mt-1 block w-full px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-colors duration-200 ease-in-out rounded-lg border-2 bg-white/50 shadow-sm";
    const validationClasses = invalid
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 hover:border-red-400"
      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-300";

    return `${baseClasses} ${validationClasses} ${className}`.trim();
  }, [invalid, className]);

  const labelClassName = "block text-sm font-medium text-gray-700 mb-1.5";
  const errorClassName = "mt-2 text-sm text-red-600 flex items-center gap-1";

  return (
    <div className={`group ${containerClassName}`}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClassName()}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
        />
      </div>
      {invalid && validationError && (
        <div id={`${id}-error`} role="alert" className={errorClassName}>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
}
