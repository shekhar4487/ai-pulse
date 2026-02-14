
import { GoogleGenAI } from "@google/genai";

export const getAISummary = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this AI news in 3 punchy bullet points. Focus on business impact. Keep it under 60 words: \n\n ${text}`,
  });
  return response.text;
};

export const getDeepDive = async (title: string, content: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `As a senior AI analyst, provide a 'Deep Dive' impact analysis for the following news item: "${title}". 
    Content: ${content}
    Provide 3 sections:
    1. MARKET DISRUPTION: (Who wins/loses)
    2. TECHNICAL FEASIBILITY: (Is it hype or real?)
    3. THE 12-MONTH OUTLOOK: (Where is this going?)
    Keep the tone professional and sharp.`,
  });
  return response.text;
};

export const generateDraftFromTopic = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    config: { responseMimeType: "application/json" },
    contents: `Act as a senior tech journalist at The Rundown AI. Create a high-quality news post based on this topic: "${topic}".
    Return a JSON object with: 
    title (catchy, news-style), 
    category (one of: Breaking, Research, Business, Open Source), 
    excerpt (1-2 sentences), 
    content (3-4 detailed paragraphs).`,
  });
  return JSON.parse(response.text);
};

export const pulseChat = async (history: { role: string, parts: { text: string }[] }[], message: string, context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the AI Pulse Assistant. Your goal is to help users navigate the world of AI. 
      You have access to the following site context (Latest News & Tools): ${context}.
      Always reference specific tools or news from the context when relevant. Keep answers concise, professional, and helpful.`,
    },
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const compareTools = async (toolA: any, toolB: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Compare these two AI tools.
    Tool 1: ${toolA.name} - ${toolA.description}
    Tool 2: ${toolB.name} - ${toolB.description}
    
    Provide a concise comparison in this format:
    CORE STRENGTHS: (Tool A vs Tool B)
    PRICING VERDICT: (Which is better value?)
    BEST FOR: (Ideal user for each)
    THE WINNER: (Pick one for most users)`,
  });
  return response.text;
};

export const getToolReview = async (toolName: string, description: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Quick professional review for "${toolName}": ${description}. 1. Main Benefit, 2. Use Case, 3. Downside.`,
  });
  return response.text;
};
