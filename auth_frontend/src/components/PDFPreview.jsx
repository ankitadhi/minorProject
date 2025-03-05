import {
  PDFViewer,
} from "@react-pdf/renderer";

import ResumePDF from "./ResumePdf";





const PDFPreview = ({ formData, template }) => {
    //  const handleDownload = async () => {
    //    const blob = await pdf(
    //      <ResumePDF formData={formData} template={template} />
    //    ).toBlob();
    //    saveAs(blob, "resume.pdf");
    //  };
  return (
    <div className="bg-white shadow-md rounded-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Live Preview</h2>
      <div className="h-[calc(100%-50px)]">
        <PDFViewer width="100%" height="100%">
          <ResumePDF formData={formData} template={template} />
        </PDFViewer>
      </div>

    </div>
  );
};

export default PDFPreview;
