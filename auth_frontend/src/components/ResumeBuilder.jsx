import { useState, useEffect } from "react";
import DetailsForms from "./DetalisForms";
import PDFPreview from "./PDFPreview";
import { useParams } from "react-router";




const BASEURL = "http://127.0.0.1:8080/templates/templates/";

const ResumeBuilder = () => {
  const { templateId } = useParams(); 
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    summary:"",
    skills: [],
    education: [
      {
        degree: "",
        institution: "",
        year: "",
      },
    ],
    experience: [
      {
        company: "",
        role: "",
        duration: "",
      },
    ],
    certifications: [],
    projects: [
      {
        name: "",
        description: "",
        link: "",
      },
    ]
  });


    useEffect(() => {
      const fetchTemplate = async () => {
        try {
          const response = await fetch(`${BASEURL}${templateId}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch template");
          }
          const data = await response.json();
          setTemplate(data);
        } catch (error) {
          console.error("Error fetching template:", error);
        }
      };
  
      fetchTemplate();
    }, [templateId]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6">
      {/* Left: Form Input */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md rounded-md">
        <DetailsForms formData={formData} setFormData={setFormData} />
      </div>

      {/* Right: Live PDF Preview */}
      <div className="w-full md:w-1/2 p-4">
        <PDFPreview formData={formData} template={template}  />
      </div>
    </div>
  );
};

export default ResumeBuilder;
