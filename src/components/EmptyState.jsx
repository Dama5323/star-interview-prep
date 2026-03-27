import { FileSearch } from 'lucide-react';

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileSearch className="text-primary-600" size={40} />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Practice?</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Enter your resume and a job description above to get personalized interview questions and AI coaching.
      </p>
    </div>
  );
}

export default EmptyState;