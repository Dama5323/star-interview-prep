import { useState } from 'react';
import InputPanel from './components/InputPanel';
import QuestionList from './components/QuestionList';
import PracticeMode from './components/PracticeMode';
import ScoreBadge from './components/ScoreBadge';
import LoadingDots from './components/LoadingDots';
import { analyzeResume } from './services/aiService';
import useLocalStorage from './hooks/useLocalStorage';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Award
} from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useLocalStorage('interviewAnalysis', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [savedInputs, setSavedInputs] = useLocalStorage('savedInputs', {
    resume: '',
    jobDescription: ''
  });

  const handleAnalyze = async (resume, jobDescription) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeResume(resume, jobDescription);
      setAnalysis(result);
      setSavedInputs({ resume, jobDescription });
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePractice = (question) => {
    setPracticeQuestion(question);
  };

  const handleBackToQuestions = () => {
    setPracticeQuestion(null);
  };

  const handleReanalyze = () => {
    setAnalysis(null);
    setError(null);
  };

  if (practiceQuestion) {
    return (
      <PracticeMode 
        question={practiceQuestion} 
        onBack={handleBackToQuestions}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <div className="container mx-auto px-4 py-16 max-w-7xl relative">
          
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
              <Zap size={16} className="text-indigo-600" />
              <span className="text-sm font-medium">AI-Powered Interview Preparation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ace Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Interview
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your resume into interview success. Get personalized questions, 
              STAR-method answers, and AI coaching feedback tailored to your experience.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button 
                onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                Start Free <ArrowRight size={18} />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all">
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">3.5K+</div>
                <div className="text-sm text-gray-500">Resumes Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">92%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-1">
                  4.9 <Star size={18} className="fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16 text-white" preserveAspectRatio="none" viewBox="0 0 1440 74">
            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,74L1360,74C1280,74,1120,74,960,74C800,74,640,74,480,74C320,74,160,74,80,74L0,74Z"></path>
          </svg>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to interview success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Share Your Resume</h3>
              <p className="text-gray-500">Paste your resume text or upload PDF/DOCX</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Add Job Description</h3>
              <p className="text-gray-500">Paste the role you're targeting</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-pink-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Get AI Coaching</h3>
              <p className="text-gray-500">Receive personalized questions and feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Interview Coach?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to prepare for your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Personalized Questions</h3>
                <p className="text-gray-500 text-sm">AI analyzes your resume against job descriptions to predict exactly what you'll be asked</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">STAR Method Answers</h3>
                <p className="text-gray-500 text-sm">Get crafted answers using your actual experience, not generic templates</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Coaching Feedback</h3>
                <p className="text-gray-500 text-sm">Practice your answers and get warm, personalized feedback to improve</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Save Your Progress</h3>
                <p className="text-gray-500 text-sm">Your analysis saves automatically. Refresh anytime to continue practicing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div id="input-section" className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Start Your Preparation</h2>
            <p className="text-gray-500">Enter your resume and job description below</p>
          </div>
          
          <InputPanel 
            onAnalyze={handleAnalyze} 
            loading={loading}
            initialResume={savedInputs.resume}
            initialJobDesc={savedInputs.jobDescription}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-12 text-center">
              <LoadingDots />
              <p className="text-gray-500 mt-2">Analyzing your resume against the job description...</p>
              <p className="text-sm text-gray-400 mt-1">This usually takes 10-15 seconds</p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {analysis && !loading && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Your Analysis Results</h2>
              <button
                onClick={handleReanalyze}
                className="px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium flex items-center gap-2 shadow-sm"
              >
                <Sparkles size={16} />
                New Analysis
              </button>
            </div>
            
            <ScoreBadge 
              score={analysis.matchScore}
              missingKeywords={analysis.missingKeywords}
              strengths={analysis.strengths}
            />
            <QuestionList 
              questions={analysis.questions}
              onPractice={handlePractice}
            />
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      {!analysis && !loading && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Loved by Job Seekers</h2>
              <p className="text-gray-600">Join thousands who aced their interviews</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"This tool helped me land my dream job at Google. The personalized questions were spot on!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Chen</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"The AI coaching feedback helped me refine my answers. I felt so much more confident!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">Product Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"Got 3 offers within 2 weeks of using this. The STAR answers were incredibly helpful!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Emily Watson</p>
                    <p className="text-sm text-gray-500">Data Scientist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={24} className="text-indigo-400" />
            <span className="text-xl font-bold">Interview Coach</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            AI-powered interview preparation to help you land your dream job
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
            © 2026 Interview Coach. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;