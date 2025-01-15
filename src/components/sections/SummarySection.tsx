import { format } from "date-fns";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Form } from "../../types/form";

interface SummarySectionProps {
  formId: string;
  data: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

interface ValidationError {
  section: number;
  field: string;
  message: string;
}

export default function SummarySection({ formId, data }: SummarySectionProps) {
  const getValidationErrors = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Personal Data Validation
    if (!data.personalData?.firstName) {
      errors.push({
        section: 1,
        field: "firstName",
        message: "First name is required",
      });
    }
    if (!data.personalData?.lastName) {
      errors.push({
        section: 1,
        field: "lastName",
        message: "Last name is required",
      });
    }
    if (!data.personalData?.dateOfBirth) {
      errors.push({
        section: 1,
        field: "dateOfBirth",
        message: "Date of birth is required",
      });
    }
    if (!data.personalData?.gender) {
      errors.push({
        section: 1,
        field: "gender",
        message: "Gender is required",
      });
    }

    // Address Validation
    if (!data.address?.street) {
      errors.push({
        section: 2,
        field: "street",
        message: "Street address is required",
      });
    }
    if (!data.address?.city) {
      errors.push({ section: 2, field: "city", message: "City is required" });
    }
    if (!data.address?.state) {
      errors.push({ section: 2, field: "state", message: "State is required" });
    }
    if (!data.address?.country) {
      errors.push({
        section: 2,
        field: "country",
        message: "Country is required",
      });
    }
    if (!data.address?.postalCode) {
      errors.push({
        section: 2,
        field: "postalCode",
        message: "Postal code is required",
      });
    }

    // Parents Validation
    if (!data.parents?.mother?.firstName) {
      errors.push({
        section: 3,
        field: "mother.firstName",
        message: "Mother's first name is required",
      });
    }
    if (!data.parents?.mother?.lastName) {
      errors.push({
        section: 3,
        field: "mother.lastName",
        message: "Mother's last name is required",
      });
    }
    if (!data.parents?.father?.firstName) {
      errors.push({
        section: 3,
        field: "father.firstName",
        message: "Father's first name is required",
      });
    }
    if (!data.parents?.father?.lastName) {
      errors.push({
        section: 3,
        field: "father.lastName",
        message: "Father's last name is required",
      });
    }

    return errors;
  };

  const validationErrors = getValidationErrors();
  const isFormComplete = validationErrors.length === 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Summary</h2>
        <p className="text-gray-600">
          Review your information before submission.
        </p>
      </div>

      <div className="space-y-6">
        {/* Form Status */}
        <div
          className={`p-4 rounded-lg ${
            isFormComplete ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center">
            {isFormComplete ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span
              className={`font-medium ${
                isFormComplete ? "text-green-800" : "text-red-800"
              }`}
            >
              {isFormComplete
                ? "Form is complete"
                : "Form has validation errors"}
            </span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.personalData
                    ? `${data.personalData.firstName} ${data.personalData.lastName}`
                    : "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.personalData?.dateOfBirth
                    ? format(new Date(data.personalData.dateOfBirth), "PPP")
                    : "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">
                  {data.personalData?.gender?.replace("_", " ") ||
                    "Not provided"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Address Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Street Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.address?.street || "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.address?.city || "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.address?.state || "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.address?.country || "Not provided"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Postal Code
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.address?.postalCode || "Not provided"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Parents Information */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Parents Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Mother's Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Mother's Information
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.mother
                        ? `${data.parents.mother.firstName} ${data.parents.mother.lastName}`
                        : "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.mother?.dateOfBirth
                        ? format(
                            new Date(data.parents.mother.dateOfBirth),
                            "PPP"
                          )
                        : "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.mother?.isAlive ? "Alive" : "Deceased"}
                    </dd>
                  </div>
                  {data.parents?.mother?.isAlive &&
                    !data.parents?.mother?.sameAddress && (
                      <div className="col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data.parents?.mother?.address ? (
                            <span>
                              {data.parents.mother.address.street},{" "}
                              {data.parents.mother.address.city},{" "}
                              {data.parents.mother.address.state},{" "}
                              {data.parents.mother.address.country},{" "}
                              {data.parents.mother.address.postalCode}
                            </span>
                          ) : (
                            "Not provided"
                          )}
                        </dd>
                      </div>
                    )}
                </dl>
              </div>

              {/* Father's Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Father's Information
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.father
                        ? `${data.parents.father.firstName} ${data.parents.father.lastName}`
                        : "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.father?.dateOfBirth
                        ? format(
                            new Date(data.parents.father.dateOfBirth),
                            "PPP"
                          )
                        : "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data.parents?.father?.isAlive ? "Alive" : "Deceased"}
                    </dd>
                  </div>
                  {data.parents?.father?.isAlive &&
                    !data.parents?.father?.sameAddress && (
                      <div className="col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data.parents?.father?.address ? (
                            <span>
                              {data.parents.father.address.street},{" "}
                              {data.parents.father.address.city},{" "}
                              {data.parents.father.address.state},{" "}
                              {data.parents.father.address.country},{" "}
                              {data.parents.father.address.postalCode}
                            </span>
                          ) : (
                            "Not provided"
                          )}
                        </dd>
                      </div>
                    )}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {!isFormComplete && (
          <div className="bg-red-50 rounded-lg border border-red-200 p-4">
            <h4 className="text-sm font-medium text-red-800 mb-4">
              Please fix the following errors:
            </h4>
            <ul className="space-y-2">
              {validationErrors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-700">{error.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
