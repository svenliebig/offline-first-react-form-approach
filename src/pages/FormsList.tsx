import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, FileText } from 'lucide-react';
import { getForms, createForm } from '../api/forms';
import { format } from 'date-fns';

export default function FormsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: forms = [], isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: getForms
  });

  const createFormMutation = useMutation({
    mutationFn: createForm,
    onSuccess: (newForm) => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      navigate(`/forms/${newForm.id}`);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Forms</h1>
        <button
          onClick={() => createFormMutation.mutate()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={createFormMutation.isPending}
        >
          <PlusCircle className="w-5 h-5" />
          Create New Form
        </button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
          <p className="text-gray-500">Create your first form to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {forms.map((form) => (
            <div
              key={form.id}
              onClick={() => navigate(`/forms/${form.id}`)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {form.personalData?.firstName
                      ? `${form.personalData.firstName} ${form.personalData.lastName}`
                      : 'Untitled Form'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {format(new Date(form.lastUpdated), 'PPP')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Section {form.lastVisitedSection} of 4
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}