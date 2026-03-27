import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

function ScoreBadge({ score, missingKeywords, strengths }) {
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRing = () => {
    if (score >= 80) return 'ring-green-500';
    if (score >= 60) return 'ring-yellow-500';
    return 'ring-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Score Circle */}
        <div className="flex-shrink-0">
          <div className={`w-32 h-32 rounded-full ring-4 ${getScoreRing()} flex items-center justify-center bg-gray-50`}>
            <div className="text-center">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-gray-500 text-sm">%</span>
              <p className="text-xs text-gray-400 mt-1">Match Score</p>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="flex-1">
          <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <CheckCircle size={18} />
            Strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {strengths?.map((strength, idx) => (
              <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="flex-1">
          <h3 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
            <AlertCircle size={18} />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords?.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBadge;