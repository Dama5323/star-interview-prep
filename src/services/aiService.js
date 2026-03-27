const API_KEY = import.meta.env.VITE_AI_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function analyzeResume(resume, jobDescription) {
  const prompt = `You are an expert interview coach. Analyze this resume and job description to help the candidate prepare.

Resume:
${resume.substring(0, 4000)}  // Limit to avoid token limits

Job Description:
${jobDescription.substring(0, 3000)}

Provide a JSON response with EXACTLY this structure (no extra text):
{
  "matchScore": 75,
  "missingKeywords": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2"],
  "questions": [
    {
      "question": "Tell me about a time you...",
      "reason": "The job description emphasizes leadership...",
      "starAnswer": "In my previous role as...",
      "deliveryTip": "Speak with confidence and use specific metrics",
      "accentColor": "green"
    }
  ]
}

Accent colors should be one of: "green", "orange", "pink", "blue"
Generate 7 questions total.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert interview coach. Always return valid JSON only, no markdown or explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Clean and parse JSON
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```\n?/, '').replace(/```\n?$/, '');
    }
    
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error('AI Analysis failed:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}

export async function getCoachingFeedback(question, userAnswer, starAnswer) {
  const prompt = `You are a warm, encouraging interview coach. Provide feedback on this interview answer.

Question: ${question}
User's Answer: ${userAnswer}
Suggested STAR Answer: ${starAnswer}

Provide warm, personalised feedback that:
1. Highlights what they did well (be specific)
2. Suggests 1-2 things to improve
3. Gives one actionable tip

Keep it encouraging and specific. Format as a short paragraph.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a warm, encouraging interview coach. Be specific and actionable.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Coaching feedback failed:', error);
    return "You're making great progress! Try to include specific examples from your experience and structure your answer using the STAR method (Situation, Task, Action, Result). Keep practicing! 🌟";
  }
}