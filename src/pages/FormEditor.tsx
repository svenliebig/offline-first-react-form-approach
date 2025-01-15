import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm } from "../api/forms";
import AddressSection from "../components/sections/AddressSection";
import ParentsSection from "../components/sections/ParentsSection";
import PersonalDataSection from "../components/sections/PersonalDataSection";
import SummarySection from "../components/sections/SummarySection";
import { useFormSync } from "../hooks/useFormSync";
import { useFormStore } from "../store/formStore";

export default function FormEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentForm, setCurrentForm } = useFormStore();
  const { updateFormData } = useFormSync(id!);

  const {
    data: form,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["form", id],
    queryFn: () => getForm(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (form) {
      setCurrentForm(form);
    }
  }, [form, setCurrentForm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !currentForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Form not found
        </h2>
        <p className="text-gray-600 mb-4">
          The form you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/forms")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Forms
        </button>
      </div>
    );
  }

  const sections = [
    {
      id: 1,
      title: "Personal Information",
      component: PersonalDataSection,
      isComplete: !!currentForm.personalData,
      isVisited: currentForm.sectionsVisited.includes(1),
    },
    {
      id: 2,
      title: "Address",
      component: AddressSection,
      isComplete: !!currentForm.address,
      isVisited: currentForm.sectionsVisited.includes(2),
    },
    {
      id: 3,
      title: "Parents Information",
      component: ParentsSection,
      isComplete: !!currentForm.parents,
      isVisited: currentForm.sectionsVisited.includes(3),
    },
    {
      id: 4,
      title: "Summary",
      component: SummarySection,
      isComplete: true,
      isVisited: currentForm.sectionsVisited.includes(4),
    },
  ];

  const currentSection = sections[currentForm.lastVisitedSection - 1];

  const handleSectionChange = (sectionId: number) => {
    if (!currentForm.sectionsVisited.includes(sectionId)) {
      updateFormData({
        sectionsVisited: [...currentForm.sectionsVisited, sectionId],
      });
    }
    updateFormData({ lastVisitedSection: sectionId });
  };

  const CurrentSectionComponent = currentSection.component;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => navigate("/forms")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Forms
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md ${
                    currentForm.lastVisitedSection === section.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {section.title}
                  {section.isVisited && (
                    <span className="absolute -top-1 -right-1">
                      {section.isComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <CurrentSectionComponent
            formId={currentForm.id}
            data={currentForm}
            onUpdate={updateFormData}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() =>
              handleSectionChange(
                Math.max(1, currentForm.lastVisitedSection - 1)
              )
            }
            disabled={currentForm.lastVisitedSection === 1}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>
          <button
            onClick={() =>
              handleSectionChange(
                Math.min(4, currentForm.lastVisitedSection + 1)
              )
            }
            disabled={currentForm.lastVisitedSection === 4}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </main>
    </div>
  );
}
