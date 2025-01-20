Create a multi-section form application with React, TypeScript, and Fastify using the following architecture and requirements:

Frontend (React + TypeScript):

````typescript
// Core features:
- Multi-step form with 3 sections + summary
- Client-side validation
- Offline-first data persistence
- Intelligent request batching
- Progress tracking
- Error handling with field focus
- Route-based navigation
- Form resumption

// Data Models:
interface PersonalData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
}

interface AddressData {
  country: string;
  state: string;
  postalCode: string;
  street: string;
}

interface ParentData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  isAlive: boolean;
  sameAddress: boolean;
  address?: AddressData;
}

interface FormData {
  id: string;
  personal: PersonalData;
  address: AddressData;
  parents: ParentData[];
  lastVisitedSection: number;
  sectionValidityStatus: Record<number, boolean>;
  hasInteractedWith: Record<number, boolean>;
}

// API Requirements:
- Throttled requests (2s delay)
- Request timeout handling (5s max)
- Partial updates support
- Offline capability
- Request batching and merging
- Form creation/resumption

// Routes:
/forms - List all forms, create new
/forms/:id - Form editor with sections

// Validation Rules:
- Required fields
- Date validations (not future)
- Postal code format
- Basic string lengths
- Conditional address validation

// State Management:
- Local form state
- Persistence queue
- Network status
- Validation status
- Section interaction tracking

Backend (Fastify):
```typescript
// Endpoints:
POST /api/forms - Create new form
GET /api/forms - List all forms
GET /api/forms/:id - Get specific form
PATCH /api/forms/:id - Update form partially

// Features:
- Partial updates
- Form persistence
- Basic validation
- Static user (ID: 1)
- Form progress tracking

// Error Handling:
- Validation errors
- Timeout simulation
- Partial update conflicts
````

Implementation Requirements:

- Clean architecture with separate concerns
- Modular section components
- Extensible validation system
- Offline-first approach
- Non-blocking UI updates
- Progressive form completion
- Smart data persistence
- Intelligent error handling
- Responsive design
- Accessibility support
