import React from 'react';
import { Form, Parent } from '../../types/form';
import { useFormValidation } from '../../hooks/useFormValidation';

interface ParentsSectionProps {
  formId: string;
  data: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

const ParentForm = ({
  type,
  parent,
  onChange,
  onBlur,
  errors,
  touched,
}: {
  type: 'mother' | 'father';
  parent: Parent | undefined;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}) => {
  const prefix = type === 'mother' ? 'mother' : 'father';

  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 capitalize">{type}'s Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${prefix}.firstName`} className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id={`${prefix}.firstName`}
            value={parent?.firstName || ''}
            onChange={(e) => onChange(`${prefix}.firstName`, e.target.value)}
            onBlur={() => onBlur(`${prefix}.firstName`)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched[`${prefix}.firstName`] && errors[`${prefix}.firstName`]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {touched[`${prefix}.firstName`] && errors[`${prefix}.firstName`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.firstName`]}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${prefix}.lastName`} className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id={`${prefix}.lastName`}
            value={parent?.lastName || ''}
            onChange={(e) => onChange(`${prefix}.lastName`, e.target.value)}
            onBlur={() => onBlur(`${prefix}.lastName`)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched[`${prefix}.lastName`] && errors[`${prefix}.lastName`]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {touched[`${prefix}.lastName`] && errors[`${prefix}.lastName`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.lastName`]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${prefix}.dateOfBirth`} className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id={`${prefix}.dateOfBirth`}
            value={parent?.dateOfBirth || ''}
            onChange={(e) => onChange(`${prefix}.dateOfBirth`, e.target.value)}
            onBlur={() => onBlur(`${prefix}.dateOfBirth`)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched[`${prefix}.dateOfBirth`] && errors[`${prefix}.dateOfBirth`]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {touched[`${prefix}.dateOfBirth`] && errors[`${prefix}.dateOfBirth`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.dateOfBirth`]}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={parent?.isAlive ?? true}
              onChange={(e) => onChange(`${prefix}.isAlive`, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Is Alive</span>
          </label>
        </div>
      </div>

      {parent?.isAlive && (
        <>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={parent?.sameAddress ?? false}
                onChange={(e) => onChange(`${prefix}.sameAddress`, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Same address as mine</span>
            </label>
          </div>

          {!parent?.sameAddress && (
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor={`${prefix}.address.street`} className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id={`${prefix}.address.street`}
                  value={parent?.address?.street || ''}
                  onChange={(e) => onChange(`${prefix}.address.street`, e.target.value)}
                  onBlur={() => onBlur(`${prefix}.address.street`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${prefix}.address.city`} className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id={`${prefix}.address.city`}
                    value={parent?.address?.city || ''}
                    onChange={(e) => onChange(`${prefix}.address.city`, e.target.value)}
                    onBlur={() => onBlur(`${prefix}.address.city`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor={`${prefix}.address.state`} className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id={`${prefix}.address.state`}
                    value={parent?.address?.state || ''}
                    onChange={(e) => onChange(`${prefix}.address.state`, e.target.value)}
                    onBlur={() => onBlur(`${prefix}.address.state`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${prefix}.address.country`} className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id={`${prefix}.address.country`}
                    value={parent?.address?.country || ''}
                    onChange={(e) => onChange(`${prefix}.address.country`, e.target.value)}
                    onBlur={() => onBlur(`${prefix}.address.country`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor={`${prefix}.address.postalCode`} className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id={`${prefix}.address.postalCode`}
                    value={parent?.address?.postalCode || ''}
                    onChange={(e) => onChange(`${prefix}.address.postalCode`, e.target.value)}
                    onBlur={() => onBlur(`${prefix}.address.postalCode`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function ParentsSection({ formId, data, onUpdate }: ParentsSectionProps) {
  const { validate, errors, touched, setTouched } = useFormValidation(
    'parents',
    data.parents
  );

  const handleParentChange = (field: string, value: any) => {
    const [parent, ...path] = field.split('.');
    const updatedParent = { ...data.parents?.[parent as 'mother' | 'father'] };
    
    let current = updatedParent;
    const lastKey = path[path.length - 1];
    
    path.slice(0, -1).forEach((key) => {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    });
    
    current[lastKey] = value;

    const updatedParents = {
      ...data.parents,
      [parent]: updatedParent,
    };

    onUpdate({ parents: updatedParents });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Parents Information</h2>
        <p className="text-gray-600">Please provide information about your parents.</p>
      </div>

      <div className="space-y-6">
        <ParentForm
          type="mother"
          parent={data.parents?.mother}
          onChange={handleParentChange}
          onBlur={setTouched}
          errors={errors}
          touched={touched}
        />

        <ParentForm
          type="father"
          parent={data.parents?.father}
          onChange={handleParentChange}
          onBlur={setTouched}
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  );
}