import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ResumePDF from "./ResumePdf";

const DownloadButton = ({ formData }) => {
  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF formData={formData} />).toBlob();
    saveAs(blob, "resume.pdf");
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;