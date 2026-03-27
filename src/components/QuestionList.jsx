import QuestionCard from './QuestionCard';

function QuestionList({ questions, onPractice }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No questions generated yet. Submit your resume and job description to start.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Top {questions.length} Likely Interview Questions
      </h2>
      <div className="grid gap-4">
        {questions.map((question, idx) => (
          <QuestionCard 
            key={idx} 
            question={question} 
            onPractice={onPractice}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionList;