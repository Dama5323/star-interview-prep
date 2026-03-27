import { useState } from 'react';
import { ArrowLeft, Send, Mic, MicOff } from 'lucide-react';
import LoadingDots from './LoadingDots';
import { getCoachingFeedback } from '../services/aiService';

function PracticeMode({ question, onBack }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Voice recording (Web Speech API)
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserAnswer(prev => prev ? prev + ' ' + transcript : transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert('Error with voice recognition. Please try again.');
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleGetFeedback = async () => {
    if (!userAnswer.trim()) {
      alert('Please write or record your answer first.');
      return;
    }

    setLoading(true);
    try {
      const coachingFeedback = await getCoachingFeedback(
        question.question,
        userAnswer,
        question.starAnswer
      );
      setFeedback(coachingFeedback);
    } catch (error) {
      console.error('Feedback error:', error);
      setFeedback("You're making great progress! Try to include specific examples from your experience and structure your answer using the STAR method (Situation, Task, Action, Result).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
        >
          <ArrowLeft size={20} />
          Back to questions
        </button>

        {/* Question Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Practice Question</h2>
          <p className="text-gray-700 text-lg">{question.question}</p>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              <span className="font-medium">💡 Why they ask:</span> {question.reason}
            </p>
          </div>
        </div>

        {/* Answer Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between">
            <span>Your Answer</span>
            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                isRecording 
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              {isRecording ? 'Recording...' : 'Record Voice'}
            </button>
          </h3>
          
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type or record your answer here... Try to use the STAR method (Situation, Task, Action, Result)"
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
          />

          <button
            onClick={handleGetFeedback}
            disabled={loading || !userAnswer.trim()}
            className="mt-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <LoadingDots /> : <><Send size={16} /> Get AI Coaching</>}
          </button>
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              AI Coaching Feedback
            </h3>
            <p className="text-gray-700 leading-relaxed">{feedback}</p>
          </div>
        )}

        {/* Suggested Answer Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">📝 Suggested STAR Answer (for reference)</h4>
          <p className="text-gray-600 text-sm">{question.starAnswer}</p>
        </div>
      </div>
    </div>
  );
}

export default PracticeMode;