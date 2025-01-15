import React from 'react';
import { Form, Address } from '../../types/form';
import { useFormValidation } from '../../hooks/useFormValidation';

interface AddressSectionProps {
  formId: string;
  data: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function AddressSection({ formId, data, onUpdate }: AddressSectionProps) {
  const { validate, errors, touched, setTouched } = useFormValidation<Address>(
    'address',
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Address Information</h2>
        <p className="text-gray-600">Please provide your current address.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            value={data.address?.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
            onBlur={() => handleBlur('street')}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              touched.street && errors.street
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {touched.street && errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={data.address?.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              onBlur={() => handleBlur('city')}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                touched.city && errors.city
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {touched.city && errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              value={data.address?.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              onBlur={() => handleBlur('state')}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                touched.state && errors.state
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {touched.state && errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={data.address?.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              onBlur={() => handleBlur('country')}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                touched.country && errors.country
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {touched.country && errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={data.address?.postalCode || ''}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              onBlur={() => handleBlur('postalCode')}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                touched.postalCode && errors.postalCode
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {touched.postalCode && errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}