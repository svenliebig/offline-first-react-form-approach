Here's an enhanced version of your prompt:

Create a Multi-Section Form POC with React, TypeScript, and Fastify

Technical Requirements:

- Frontend: React with TypeScript
- Backend: Fastify server
- State Management: Your choice (Redux, Context API, etc.)
- Form Management: Your choice (React Hook Form, Formik, etc.)

Core Features:

1. Form Structure:

- Three distinct sections with validation:
  a. Personal Data (name, surname, date of birth, gender)
  b. Address Data (state, country, postal code)
  c. Parents Information (name, birthdate, living status, address with option to use previously entered address)
- Final summary page showing validation status and collected data
- Interactive validation errors with direct navigation to problematic fields

2. Data Persistence Requirements:

- Client-side persistence for offline functionality
- Server-side persistence with partial updates
- Throttled backend updates (2-second delay)
- Request timeout handling (5-second limit)
- Intelligent update merging for offline changes

3. Form Navigation:

- Route `/forms`: Display list of existing forms
- Route `/forms/{id}`: Display specific form
- Auto-navigation to first incomplete section
- New form creation with server-allocated ID

4. Validation Behavior:

- On-blur field validation
- Section-specific validation status
- Validation errors only shown after user interaction with section
- Common validations (required fields, future date prevention)

5. Data Synchronization:

- Non-blocking UI during persistence operations
- Offline-first approach
- Smart request batching
- Failed request handling with automatic retry
- Partial update support

Technical Implementation Details:

- Backend must support partial model updates
- User ID hardcoded to 1 for simplicity
- Form ID must be allocated before form render
- Modular section architecture for easy addition/removal
- Clear separation of data models and application structure

Example Update Merging:

```typescript
// Multiple changes while offline
// Initial: { name: "John", lastName: "Doe" }
// Change 1: { name: "Robert" }
// Change 2: { lastName: "Schmidt" }
// Change 3: { name: "Roberto" }

// Final merged request:
{ name: "Roberto", lastName: "Schmidt" }
```

Deliverables:

1. Working POC with all specified features
2. Well-structured codebase with clear separation of concerns
3. Basic documentation of architecture decisions
4. Example of adding/removing a form section
