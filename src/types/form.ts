import { z } from 'zod';

export const genderSchema = z.enum(['male', 'female', 'other', 'prefer_not_to_say']);

export const personalDataSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine((date) => {
    const parsed = new Date(date);
    return parsed <= new Date();
  }, 'Date of birth cannot be in the future'),
  gender: genderSchema
});

export const addressSchema = z.object({
  street: z.string().min(5, 'Street must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters')
});

export const parentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine((date) => {
    const parsed = new Date(date);
    return parsed <= new Date();
  }, 'Date of birth cannot be in the future'),
  isAlive: z.boolean(),
  sameAddress: z.boolean().optional(),
  address: addressSchema.optional()
});

export const parentsSchema = z.object({
  mother: parentSchema,
  father: parentSchema
});

export const formSchema = z.object({
  id: z.string(),
  personalData: personalDataSchema,
  address: addressSchema,
  parents: parentsSchema,
  lastVisitedSection: z.number().min(1).max(4).default(1),
  sectionsVisited: z.array(z.number()).default([]),
  lastUpdated: z.string().datetime()
});

export type Gender = z.infer<typeof genderSchema>;
export type PersonalData = z.infer<typeof personalDataSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Parent = z.infer<typeof parentSchema>;
export type Parents = z.infer<typeof parentsSchema>;
export type Form = z.infer<typeof formSchema>;

export type FormSection = {
  id: number;
  title: string;
  description: string;
  validate: (data: any) => boolean;
  hasBeenVisited: boolean;
};