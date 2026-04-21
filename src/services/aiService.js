/**
 * aiService.js — Pathlo AI Service
 * 
 * Centralized Groq API integration for:
 * - Chat responses
 * - College insights
 * 
 * Endpoint: https://api.groq.com/openai/v1/chat/completions
 * Model: llama-3.3-70b-versatile
 * 
 * NO FAKE RESPONSES. API calls only.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY = 10;

const SYSTEM_PROMPT = `You are Pathlo AI, a smart and friendly career assistant for Indian students.

You help with:
- Colleges in India (engineering, liberal arts, business, law, new-age tech, research, etc.)
- Entrance exams (JEE, NEET, CUET, CAT, CLAT, IPMAT, BITSAT, XAT, GATE, and more)
- Career guidance after 10th and 12th grade
- Comparing colleges, understanding fees, placements, eligibility

Rules:
- Understand typos and informal names (e.g. "Stepen College" → St. Stephen's College)
- Answer conversationally and warmly
- Keep answers concise (3–6 lines max unless asked for more)
- Give honest, realistic answers — no hype or fake claims
- Use simple line breaks. Avoid heavy markdown
- If the user greets you, greet back and invite a question`;

/* ════════════════════════════════════════════════════════════════
   CHATBOT: Chat with AI
   ════════════════════════════════════════════════════════════════ */
export async function chatWithAI(messages) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('API key not configured');
  }

  // Keep only last N messages to avoid token bloat
  const trimmedHistory = messages.slice(-MAX_HISTORY);

  const payload = {
    model: MODEL,
    max_tokens: 400,
    temperature: 0.7,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedHistory,
    ],
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || 
      `API Error: ${response.status}`
    );
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('Empty response from API');
  }

  return text;
}

/* ════════════════════════════════════════════════════════════════
   COLLEGE INSIGHT: Dynamic AI summary
   ════════════════════════════════════════════════════════════════ */
export async function generateCollegeInsight(college) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const prompt = buildCollegePrompt(college);

  const payload = {
    model: MODEL,
    max_tokens: 150,
    temperature: 0.4,
    messages: [{ role: 'user', content: prompt }],
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || 
      `API Error: ${response.status}`
    );
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('Empty response from API');
  }

  return text;
}

/* ════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════ */
function buildCollegePrompt(college) {
  const {
    name,
    location,
    type,
    category,
    courses = [],
    coursesOffered = [],
    entryExams = [],
  } = college;

  const courseList = (courses.length > 0 ? courses : coursesOffered)
    .slice(0, 3)
    .join(', ');

  return `Give a short, honest summary of ${name} in India.

Include:
- Who it is best for
- Key strengths
- One realistic consideration

Context:
- Type: ${type}
- Location: ${location}
- Category: ${category}
- Courses: ${courseList || 'varies'}
- Entry exams: ${entryExams.join(', ') || 'varies'}

Keep it realistic and not promotional. Respond in 2-3 sentences max.`.trim();
}
