import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const parseFile = async (file) => {
  const fileType = file.type;
  
  try {
    if (fileType === 'application/pdf') {
      // Parse PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfData = await pdfParse(arrayBuffer);
      return pdfData.text;
    } 
    else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Parse DOCX
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    else if (fileType === 'text/plain') {
      // Parse TXT
      return await file.text();
    }
    else {
      throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error('Failed to parse file. Please try pasting text directly.');
  }
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};