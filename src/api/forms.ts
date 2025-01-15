import { Form } from '../types/form';

const API_URL = 'http://localhost:3000/api';

export async function createForm(): Promise<Form> {
  const response = await fetch(`${API_URL}/forms`, {
    method: 'POST',
  });
  return response.json();
}

export async function getForms(): Promise<Form[]> {
  const response = await fetch(`${API_URL}/forms`);
  return response.json();
}

export async function getForm(id: string): Promise<Form> {
  const response = await fetch(`${API_URL}/forms/${id}`);
  if (!response.ok) {
    throw new Error('Form not found');
  }
  return response.json();
}

export async function updateForm(id: string, updates: Partial<Form>): Promise<Form> {
  const response = await fetch(`${API_URL}/forms/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}