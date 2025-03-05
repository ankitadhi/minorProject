import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setError(null);
      setParsedData([]);
      previewFile(uploadedFile);
    }
  }, []);

  // Generate preview based on file type
  const previewFile = (uploadedFile) => {
    const fileReader = new FileReader();

    if (uploadedFile.type === "application/pdf") {
      // PDF preview (URL object)
      const fileURL = URL.createObjectURL(uploadedFile);
      setFilePreview({ type: "pdf", content: fileURL });
    } else if (
      uploadedFile.type === "text/plain" ||
      uploadedFile.name.endsWith(".docx")
    ) {
      // Text file or DOCX preview (read first few lines)
      fileReader.onload = (e) => {
        const textContent = e.target.result.split("\n").slice(0, 10).join("\n"); // First 10 lines
        setFilePreview({ type: "text", content: textContent });
      };
      fileReader.readAsText(uploadedFile);
    } else {
      setFilePreview(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .docx, .txt",
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Please select or drop a file before uploading.");
      return;
    }

    setLoading(true);
    setError(null);
    setParsedData([]);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/parse/parse-resume/", 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (Array.isArray(response.data.entities)) {
        setParsedData(response.data.entities);
        console.log(response.data.entities)
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      setError("Error uploading file. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`w-80 p-6 border-2 border-dashed rounded-lg ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-400"
        } cursor-pointer text-center`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-gray-700">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        ) : (
          <p className="text-gray-600">
            Drag & Drop your resume here or{" "}
            <span className="text-blue-500">click to browse</span>
          </p>
        )}
      </div>

      {/* File Preview */}
      {filePreview && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md w-3/4">
          <h3 className="text-lg font-semibold mb-2">File Preview</h3>
          {filePreview.type === "pdf" ? (
            <iframe
              src={filePreview.content}
              className="w-full h-64 border"
              title="PDF Preview"
            ></iframe>
          ) : (
            <pre className="p-2 bg-gray-100 rounded-md whitespace-pre-wrap">
              {filePreview.content}
            </pre>
          )}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Parse"}
      </button>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Parsed Resume Data Table */}
      {parsedData.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md w-3/4">
          <h3 className="text-lg font-semibold mb-4">Extracted Resume Data</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Entity</th>
                <th className="border border-gray-300 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map(([value, entity], index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 font-semibold capitalize w-1/3">
                    {entity.replace(/_/g, " ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entity.toLowerCase().includes("link") ||
                    entity.toLowerCase().includes("linkedin") ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
