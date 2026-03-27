import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Mic } from 'lucide-react';

const accentColors = {
  green: 'border-l-4 border-emerald-500 hover:shadow-emerald-100',
  orange: 'border-l-4 border-orange-500 hover:shadow-orange-100',
  pink: 'border-l-4 border-pink-500 hover:shadow-pink-100',
  blue: 'border-l-4 border-blue-500 hover:shadow-blue-100',
};

function QuestionCard({ question, onPractice }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentClass = accentColors[question.accentColor] || accentColors.blue;

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${accentClass}`}>
      <div 
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-semibold text-gray-800 flex-1">
            {question.question}
          </h3>
          <button className="text-gray-400 hover:text-primary-600 transition">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          <span className="font-medium">Why they ask:</span> {question.reason}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-gray-100 space-y-4">
          {/* STAR Answer */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-primary-700">✨ STAR Method Answer</h4>
              <button 
                onClick={() => handleCopy(question.starAnswer)}
                className="text-gray-400 hover:text-primary-600 transition text-sm flex items-center gap-1"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{question.starAnswer}</p>
          </div>

          {/* Delivery Tip */}
          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
            <h4 className="font-semibold text-amber-700 mb-1 flex items-center gap-2">
              <Mic size={16} />
              🎙️ Delivery Tip
            </h4>
            <p className="text-amber-800 text-sm">{question.deliveryTip}</p>
          </div>

          {/* Practice Button */}
          <button
            onClick={() => onPractice(question)}
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Practice This Question
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;