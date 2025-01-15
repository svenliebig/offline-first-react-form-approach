import Fastify from 'fastify';
import cors from '@fastify/cors';
import { formSchema } from '../src/types/form';

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: true
});

// In-memory storage for forms
const forms = new Map();

// Create a new form
fastify.post('/api/forms', async (request, reply) => {
  const id = crypto.randomUUID();
  const newForm = {
    id,
    personalData: null,
    address: null,
    parents: null,
    lastVisitedSection: 1,
    sectionsVisited: [],
    lastUpdated: new Date().toISOString()
  };
  
  forms.set(id, newForm);
  return reply.code(201).send(newForm);
});

// Get all forms
fastify.get('/api/forms', async (request, reply) => {
  return Array.from(forms.values());
});

// Get a specific form
fastify.get('/api/forms/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const form = forms.get(id);
  
  if (!form) {
    return reply.code(404).send({ error: 'Form not found' });
  }
  
  return form;
});

// Update a form (partial updates allowed)
fastify.patch('/api/forms/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const updates = request.body as Record<string, any>;
  
  const form = forms.get(id);
  if (!form) {
    return reply.code(404).send({ error: 'Form not found' });
  }
  
  // Simulate slow network/processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const updatedForm = {
    ...form,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  
  forms.set(id, updatedForm);
  return updatedForm;
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();