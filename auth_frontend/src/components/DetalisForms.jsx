import { useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import NavBar from "./NavBar";
import DownloadButton from './DownloadPdf';


const DetailsForms = ({ formData, setFormData }) => {
 const [editMode, setEditMode] = useState({
   skills: false,
   education: false,
   experience: false,
   certifications: false,
   summary: false,
   projects: false,
 });

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
 };

 const handleDynamicChange = (e, index, fieldName, sectionName) => {
   const updatedSection = [...formData[sectionName]];
   if (sectionName === "skills" || sectionName === "certifications") {
     updatedSection[index] = e.target.value;
   } else {
     updatedSection[index][fieldName] = e.target.value;
   }
   setFormData({ ...formData, [sectionName]: updatedSection });
 };

 const addField = (sectionName, emptyEntry) => {
   setFormData({
     ...formData,
     [sectionName]: [...formData[sectionName], emptyEntry],
   });
 };

 const removeField = (sectionName, index) => {
   const updatedSection = formData[sectionName].filter((_, i) => i !== index);
   setFormData({ ...formData, [sectionName]: updatedSection });
 };

 const toggleEditMode = (section) => {
   setEditMode({ ...editMode, [section]: !editMode[section] });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await axios.post("http://localhost:8080/resume/resume-details/", formData);
     alert("Resume details submitted successfully!");
   } catch (error) {
     console.error(error);
     alert("Failed to submit resume details. Please try again.");
   }
 };

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add Resume Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name:</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block font-medium mb-1">LinkedIn Profile:</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              pattern="https?://.*linkedin.com.*"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>
          {/* Summary Section */}
          <div>
            <label className="block font-medium mb-1">Summary:</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Skills Section */}
          <div>
            <label className="block font-medium mb-1">Skills:</label>
            {!editMode.skills ? (
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md">
                <p>{formData.skills.join(", ") || "No skills added"}</p>
                <FaEdit
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleEditMode("skills")}
                />
              </div>
            ) : (
              <>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex space-x-4 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleDynamicChange(e, index, null, "skills")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => removeField("skills", index)}
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() => addField("skills", "")}
                  />
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={() => toggleEditMode("skills")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Education Section */}
          <div>
            <label className="block font-medium mb-1">Education:</label>
            {!editMode.education ? (
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md">
                <p>
                  {formData.education
                    .map(
                      (edu) =>
                        `${edu.degree} at ${edu.institution} (${edu.year})`
                    )
                    .join(", ") || "No education added"}
                </p>
                <FaEdit
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleEditMode("education")}
                />
              </div>
            ) : (
              <>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "degree", "education")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleDynamicChange(
                          e,
                          index,
                          "institution",
                          "education"
                        )
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "year", "education")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => removeField("education", index)}
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() =>
                      addField("education", {
                        degree: "",
                        institution: "",
                        year: "",
                      })
                    }
                  />
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={() => toggleEditMode("education")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Experience Section */}
          <div>
            <label className="block font-medium mb-1">Work Experience:</label>
            {!editMode.experience ? (
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md">
                <p>
                  {formData.experience
                    .map(
                      (exp) => `${exp.role} at ${exp.company} (${exp.duration})`
                    )
                    .join(", ") || "No experience added"}
                </p>
                <FaEdit
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleEditMode("experience")}
                />
              </div>
            ) : (
              <>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "company", "experience")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "role", "experience")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 5 months)"
                      value={exp.duration}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "duration", "experience")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => removeField("experience", index)}
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() =>
                      addField("experience", {
                        company: "",
                        role: "",
                        duration: "",
                      })
                    }
                  />
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={() => toggleEditMode("experience")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Certifications Section */}
          <div>
            <label className="block font-medium mb-1">Certifications:</label>
            {!editMode.certifications ? (
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md">
                <p>
                  {formData.certifications.join(", ") ||
                    "No certifications added"}
                </p>
                <FaEdit
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleEditMode("certifications")}
                />
              </div>
            ) : (
              <>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex space-x-4 mb-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) =>
                        handleDynamicChange(e, index, null, "certifications")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter certification"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => removeField("certifications", index)}
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() => addField("certifications", "")}
                  />
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={() => toggleEditMode("certifications")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <label className="block font-medium mb-1">Projects:</label>
            {!editMode.projects ? (
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md">
                <p>
                  {formData.projects
                    .map((proj) => `${proj.name} - ${proj.description}`)
                    .join(", ") || "No projects added"}
                </p>
                <FaEdit
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleEditMode("projects")}
                />
              </div>
            ) : (
              <>
                {formData.projects.map((proj, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "name", "projects")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={proj.description}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "description", "projects")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      type="url"
                      placeholder="Project Link"
                      value={proj.link}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "link", "projects")
                      }
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => removeField("projects", index)}
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() =>
                      addField("projects", {
                        name: "",
                        description: "",
                        link: "",
                      })
                    }
                  />
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={() => toggleEditMode("projects")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Details
          </button>
        </form>
      </div>

      {/* Download Button */}
      <div className="flex  justify-center mt-8">
        <DownloadButton formData={formData} />

      </div>
    </div>
  );
};

export default DetailsForms;
