import { ComponentProps } from "react";
import { Input } from "../ui/Input";
import { useFormStoreField } from "./hooks";

export function FieldInput({
  name,
  ...props
}: Omit<ComponentProps<typeof Input>, "onBlur" | "onChange"> & {
  name: string;
}) {
  const { value, updateForm } = useFormStoreField(name);
  // const { value, updateForm } = useThrottledFormStoreField(name);

  return (
    <Input
      value={value}
      onChange={(event) => updateForm(event.target.value)}
      {...props}
    />
  );
}
