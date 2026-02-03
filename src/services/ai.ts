import { GoogleGenAI } from "@google/genai";
import type { Content } from "../types";

// Simulation fallback for when API key is missing
const SIMULATED_RESPONSES: Record<string, string[]> = {
  default: [
    "I architect systems focusing on modularity and testability.",
    "My preference lies in statically typed languages like TypeScript for maintainability.",
    "I believe in 'Convention over Configuration' but tailored to the project's scale."
  ],
  stack: [
    "For the frontend, I rely on React within a Next.js framework for optimal hydration strategies.",
    "State management depends on complexity: Context for simple data, Redux/Zustand for complex global state, and React Query for server state.",
    "I implement automated CI/CD pipelines ensuring every commit is linted, tested, and ready for deployment."
  ],
  methodology: [
    "I advocate for Domain-Driven Design (DDD) to align the software structure with the business reality.",
    "Code reviews are non-negotiable. They are not just for error checking, but for knowledge sharing.",
    "I prioritize Core Web Vitals from day one, treating performance as a feature, not an afterthought."
  ],
  contact: [
    "If you want to discuss your system's architecture, please reach out via the contact options.",
    "My CV detailing my engineering background is available via the button above."
  ]
};

const getSimulatedResponse = (input: string, lang: 'en' | 'es'): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("stack") || lowerInput.includes("react") || lowerInput.includes("tech") || lowerInput.includes("tecnología")) {
    const res = SIMULATED_RESPONSES.stack[Math.floor(Math.random() * SIMULATED_RESPONSES.stack.length)];
    return lang === 'es' ? "Para el frontend, uso React/Next.js. La gestión de estado depende de la complejidad: React Query para estado de servidor y Zustand/Redux para estado de cliente." : res;
  } 
  
  if (lowerInput.includes("method") || lowerInput.includes("process") || lowerInput.includes("metodología") || lowerInput.includes("proceso")) {
    const res = SIMULATED_RESPONSES.methodology[Math.floor(Math.random() * SIMULATED_RESPONSES.methodology.length)];
    return lang === 'es' ? "Abogo por Domain-Driven Design (DDD). Las revisiones de código son obligatorias para asegurar la calidad y compartir conocimiento." : res;
  }

  if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("contacto")) {
    const res = SIMULATED_RESPONSES.contact[Math.floor(Math.random() * SIMULATED_RESPONSES.contact.length)];
    return lang === 'es' ? "Si deseas discutir la arquitectura de tu sistema, contáctame a través de las opciones en pantalla." : res;
  }

  const res = SIMULATED_RESPONSES.default[Math.floor(Math.random() * SIMULATED_RESPONSES.default.length)];
  return lang === 'es' ? "Arquitecturo sistemas enfocados en modularidad y testeabilidad. Prefiero lenguajes tipados como TypeScript." : res;
};

export const generateAIResponse = async (
  prompt: string, 
  contextData: Content, 
  lang: 'en' | 'es'
): Promise<string> => {
  
  if (!process.env.API_KEY) {
    console.warn("No API_KEY found. Using simulated response.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getSimulatedResponse(prompt, lang);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Updated system instruction for Tech Lead persona
    const systemInstruction = `
      You are the "Virtual Tech Lead" for a Senior Software Architect's portfolio.
      Your goal is to demonstrate technical authority and depth.
      
      Key Behaviors:
      1. Speak like a senior engineer: use terms like "scalability", "modularity", "CI/CD", "state management", "O(n)".
      2. If asked about stacks, justify WHY they are used (e.g., "Next.js for SSR SEO benefits").
      3. Avoid sales-y language. Be objective, analytical, and precise.
      4. If asked about process, focus on code quality, testing, and architecture design.
      
      The user is asking in language: ${lang}.
      
      Context Data:
      Expertise: ${JSON.stringify(contextData.expertise)}
      Projects: ${JSON.stringify(contextData.projects)}
      
      Answer concisely (max 3-4 sentences).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Re-calibrating architectural parameters...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getSimulatedResponse(prompt, lang);
  }
};
