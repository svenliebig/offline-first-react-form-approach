import { useFormValidation } from "../../hooks/useFormValidation";
import { Address, Form } from "../../types/form";
import { Input } from "../ui/Input";

interface AddressSectionProps {
  formId: string;
  data: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function AddressSection({
  formId,
  data,
  onUpdate,
}: AddressSectionProps) {
  const { validate, errors, touched, setTouched } = useFormValidation<Address>(
    "address",
    data.address
  );

  const handleBlur = (field: keyof Address) => {
    setTouched(field);
    if (data.address) {
      validate(data.address);
    }
  };

  const handleChange = (field: keyof Address, value: string) => {
    const updatedData = {
      ...data.address,
      [field]: value,
    };
    onUpdate({ address: updatedData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Address Information
        </h2>
        <p className="text-gray-600">Please provide your current address.</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Street Address"
          value={data.address?.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
          onBlur={() => handleBlur("street")}
          invalid={touched.street && !!errors.street}
          validationError={errors.street}
          containerClassName="w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            value={data.address?.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            invalid={touched.city && !!errors.city}
            validationError={errors.city}
          />

          <Input
            label="State"
            value={data.address?.state || ""}
            onChange={(e) => handleChange("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            invalid={touched.state && !!errors.state}
            validationError={errors.state}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Country"
            value={data.address?.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
            onBlur={() => handleBlur("country")}
            invalid={touched.country && !!errors.country}
            validationError={errors.country}
          />

          <Input
            label="Postal Code"
            value={data.address?.postalCode || ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            onBlur={() => handleBlur("postalCode")}
            invalid={touched.postalCode && !!errors.postalCode}
            validationError={errors.postalCode}
          />
        </div>
      </div>
    </div>
  );
}
