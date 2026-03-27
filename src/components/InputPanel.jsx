import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, File, AlertCircle, Sparkles, Clipboard, Briefcase } from 'lucide-react';
import { parseFile } from '../utils/fileParser';

function InputPanel({ onAnalyze, loading, initialResume = '', initialJobDesc = '' }) {
  const [resumeText, setResumeText] = useState(initialResume);
  const [jobDescription, setJobDescription] = useState(initialJobDesc);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [activeTab, setActiveTab] = useState(initialResume ? 'text' : 'text');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    
    try {
      const text = await parseFile(file);
      setResumeText(text);
      setActiveTab('text');
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleSubmit = () => {
    if (resumeText.trim() && jobDescription.trim()) {
      onAnalyze(resumeText, jobDescription);
    }
  };

  const handlePasteExample = () => {
    setResumeText("Software Engineer with 3+ years of React experience. Built scalable e-commerce applications. Strong JavaScript, TypeScript, and Node.js skills. Led a team of 4 developers on a major project.");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Resume Input Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            <FileText size={20} />
            Your Resume
          </h2>
          <p className="text-primary-100 text-sm mt-1">Paste text or upload PDF/DOCX</p>
        </div>
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 font-medium transition-all rounded-t-lg ${
                activeTab === 'text'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clipboard size={16} className="inline mr-1" />
              Paste Text
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 font-medium transition-all rounded-t-lg ${
                activeTab === 'upload'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Upload size={16} className="inline mr-1" />
              Upload File
            </button>
          </div>

          {activeTab === 'text' ? (
            <>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume here... Include your experience, skills, and achievements."
                className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y transition-all input-focus-effect"
                disabled={loading}
              />
              <button
                onClick={handlePasteExample}
                className="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Sparkles size={14} />
                Try example resume
              </button>
            </>
          ) : (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50 scale-105'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className={`mx-auto h-12 w-12 mb-3 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
              {uploading ? (
                <div className="space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-600">Parsing file...</p>
                </div>
              ) : isDragActive ? (
                <p className="text-primary-600 font-medium">Drop your resume here</p>
              ) : (
                <div>
                  <p className="text-gray-600">Drag & drop your resume here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <File size={12} /> PDF, DOCX, TXT
                  </p>
                </div>
              )}
            </div>
          )}

          {uploadError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle size={16} />
              {uploadError}
            </div>
          )}

          {resumeText && activeTab === 'upload' && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <File size={14} />
                File parsed successfully ({resumeText.length} chars)
              </span>
              <button onClick={() => setActiveTab('text')} className="text-green-700 hover:text-green-900 underline">
                View text
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Job Description Input Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            <Briefcase size={20} />
            Job Description
          </h2>
          <p className="text-purple-100 text-sm mt-1">Paste the role you're targeting</p>
        </div>
        
        <div className="p-6">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here... Include responsibilities, requirements, and company culture."
            className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y transition-all input-focus-effect"
            disabled={loading}
          />
        </div>
      </div>

      {/* Analyze Button */}
      <div className="md:col-span-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="group relative w-full bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing your profile...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Interview Questions
                <Sparkles size={20} />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
}

export default InputPanel;