export type Language = 'es';

export interface Content {
  nav: {
    home: string;
    expertise: string;
    projects: string;
    journey: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    ctaExplore: string;
    ctaContact: string;
  };
  expertise: {
    title: string;
    subtitle: string;
    items: ExpertiseItem[];
  };
  process: {
    title: string;
    items: ProcessItem[];
  };
  journey: {
    title: string;
    milestones: JourneyMilestone[];
  };
  projects: {
    title: string;
    viewCaseStudy: string;
    labels: {
      problem: string;
      architecture: string;
      highlights: string;
      outcome: string;
      stack: string;
    };
    items: ProjectItem[];
  };
  chat: {
    title: string;
    welcome: string;
    placeholder: string;
    thinking: string;
  };
  footer: {
    ctaTitle: string;
    ctaDescription: string;
    rights: string;
  };
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  techList: string[]; // List of specific tools/concepts
  icon: 'architecture' | 'performance' | 'integration';
}

export interface ProcessItem {
  step: string;
  title: string;
  description: string;
}

export interface JourneyMilestone {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string; // URL for the background visual
}

export interface ProjectItem {
  id: number;
  title: string;
  shortDesc: string;
  link: string;
  repo: string;
  problem: string;      // The Technical Challenge
  architecture: string; // Decision making
  highlights: string[]; // Bullet points of engineering achievements
  outcome: string;      // Business Impact
  stack: string[];
  images: string[];
}

export interface GlobalState {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: Content;
}