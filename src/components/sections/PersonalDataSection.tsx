import { useFormValidation } from "../../hooks/useFormValidation";
import { Form, PersonalData, genderSchema } from "../../types/form";

interface PersonalDataSectionProps {
  formId: string;
  data: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function PersonalDataSection({
  formId,
  data,
  onUpdate,
}: PersonalDataSectionProps) {
  const { validate, errors, touched, setTouched } =
    useFormValidation<PersonalData>("personalData", data.personalData);

  const handleBlur = (field: keyof PersonalData) => {
    setTouched(field);
    if (data.personalData) {
      validate(data.personalData);
    }
  };

  const handleChange = (field: keyof PersonalData, value: string) => {
    const updatedData = {
      ...data.personalData,
      [field]: value,
    };
    onUpdate({ personalData: updatedData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">Please provide your personal details.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={data.personalData?.firstName || ""}
            onChange={(e) => {
              handleChange("firstName", e.target.value);
              console.log(e.target.value);
            }}
            onBlur={() => handleBlur("firstName")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched.firstName && errors.firstName
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {touched.firstName && errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={data.personalData?.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched.lastName && errors.lastName
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {touched.lastName && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={data.personalData?.dateOfBirth || ""}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            onBlur={() => handleBlur("dateOfBirth")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched.dateOfBirth && errors.dateOfBirth
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            value={data.personalData?.gender || ""}
            onChange={(e) =>
              handleChange(
                "gender",
                e.target.value as keyof typeof genderSchema.enum
              )
            }
            onBlur={() => handleBlur("gender")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched.gender && errors.gender
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          {touched.gender && errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );
}
