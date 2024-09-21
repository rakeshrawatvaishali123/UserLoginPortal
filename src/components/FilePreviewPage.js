
import React from 'react';
import { useParams } from 'react-router-dom';

const filePreviews = {
  7: 'path/to/sample.pdf', // Replace with actual path to your PDF file
  8: 'path/to/sample.docx', // Replace with actual path to your DOCX file
  9: 'path/to/sample.txt',  // Replace with actual path to your TXT file
};

const FilePreviewPage = () => {
  const { id } = useParams();
  const fileUrl = filePreviews[id];

  if (!fileUrl) return <div>File not found.</div>;

  return (
    <div className="file-preview-container">
      <h2>File Preview</h2>
      <iframe src={fileUrl} width="100%" height="600px" title="File Preview"></iframe>
    </div>
  );
};

export default FilePreviewPage;
