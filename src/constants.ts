import type { Content, Language } from './types';

const EN_CONTENT: Content = {
  nav: {
    home: "Home",
    expertise: "Capabilities",
    projects: "Engineering",
    journey: "Evolution",
    contact: "Contact"
  },
  hero: {
    greeting: "Hi, I'm Javier.",
    role: "Architect of Ideas.",
    description: "Behind every great idea lies robust code. I am a Full Stack Developer specialized in designing and coding high-performance solutions, from the database to the user interface.",
    ctaExplore: "Explore Work",
    ctaContact: "Get in Touch"
  },
  expertise: {
    title: "Technical Expertise",
    subtitle: "Core competencies in modern software engineering and system architecture.",
    items: [
      {
        id: "arch",
        title: "Scalable Architecture",
        description: "Designing modular, component-driven architectures that sustain long-term growth. I enforce clean code principles and atomic design systems to ensure maintainability.",
        techList: ["Micro-frontends", "Monorepos", "State Machines"],
        icon: "architecture"
      },
      {
        id: "perf",
        title: "Performance Engineering",
        description: "Deep-dive optimization for Core Web Vitals. I focus on critical rendering paths, bundle analysis, and memory management for complex applications.",
        techList: ["Tree-shaking", "Web Workers", "WASM"],
        icon: "performance"
      },
      {
        id: "int",
        title: "Complex Integrations",
        description: "Seamlessly connecting front-end interfaces with headless CMS, graph databases, and real-time backend services.",
        techList: ["GraphQL", "WebSockets", "Serverless Functions"],
        icon: "integration"
      }
    ]
  },
  process: {
    title: "Engineering Workflow",
    items: [
      {
        step: "01",
        title: "Technical Discovery",
        description: "Analyzing system requirements, data modeling, and selecting the optimal stack for the problem domain."
      },
      {
        step: "02",
        title: "Architecture & Design",
        description: "Drafting API contracts, component hierarchies, and CI/CD pipelines before coding begins."
      },
      {
        step: "03",
        title: "Agile Implementation",
        description: "Iterative development with strict code reviews, automated testing, and continuous integration."
      },
      {
        step: "04",
        title: "Deployment & Scale",
        description: "Infrastructure setup, load testing, and observability configuration for production readiness."
      }
    ]
  },
  journey: {
    title: "The Evolution",
    milestones: [
      {
        id: 1,
        year: "The Origin",
        title: "Algorithmic Foundations",
        description: "It started with the raw logic of C++ and Python. Understanding data structures, memory management, and Big O notation gave me a permanent appreciation for efficiency before I ever touched a DOM element.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 2,
        year: "The Expansion",
        title: "Full Stack Development",
        description: "I bridged the gap between server and client. mastering Node.js and SQL. This era was defined by building complete CRUD applications and understanding the lifecycle of a request from database to pixel.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 3,
        year: "The Refinement",
        title: "Frontend Architecture",
        description: "As apps grew complex, I pivoted to structural UI design. I dove deep into React internals, state machines, and component patterns to tame chaos in large-scale interfaces.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 4,
        year: "The Scale",
        title: "Cloud & DevOps",
        description: "Code doesn't live in a vacuum. I integrated Docker, Kubernetes, and CI/CD pipelines into my workflow, ensuring that the architectures I designed were deployable, scalable, and resilient.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      },
      {
        id: 5,
        year: "The Present",
        title: "Technical Leadership",
        description: "Now, I build the systems that build systems. My focus is on high-level decision making, mentoring teams, and integrating AI to accelerate engineering workflows.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  projects: {
    title: "Case Studies",
    viewCaseStudy: "View Architecture",
    labels: {
      problem: "The Problem",
      architecture: "Architecture & Decisions",
      highlights: "Technical Highlights",
      outcome: "Business Outcome",
      stack: "Tech Stack"
    },
    items: [
      {
        id: 101,
        title: "Ethereal Finance",
        shortDesc: "High-frequency trading dashboard with WebGL visualization.",
        problem: "The client needed to visualize real-time asset flows for thousands of transactions simultaneously. DOM-based rendering was causing main-thread blocking and frame drops on low-end devices.",
        architecture: "We bypassed the DOM for the data layer, utilizing Three.js (WebGL) for rendering data points. State was managed via a custom RxJS stream to handle high-frequency updates without triggering React reconciliations unnecessarily.",
        highlights: [
          "Implemented instanced mesh rendering to handle 10k+ particles at 60fps.",
          "Decoupled data ingestion from the UI thread using Web Workers.",
          "Reduced initial load time by 40% via route-based code splitting."
        ],
        outcome: "Delivered a trading tool that outperformed competitors in speed, leading to a 45% increase in user session duration.",
        stack: ["React", "Three.js", "RxJS", "Web Workers"],
        images: ["https://picsum.photos/id/1/800/600", "https://picsum.photos/id/2/800/600", "https://picsum.photos/id/3/800/600"],
        link: "",
        repo: "",
      },
      {
        id: 102,
        title: "Neon Nexus",
        shortDesc: "Decentralized marketplace with real-time bidding engine.",
        problem: "The platform required absolute data consistency for live auctions across global users. Standard polling was too slow, and managing WebSocket connections across a micro-frontend architecture was creating race conditions.",
        architecture: "Adopted a centralized WebSocket manager within the core shell application. We used a normalized Redux store to act as the single source of truth, synchronizing optimistic UI updates with eventual consistency from the blockchain.",
        highlights: [
          "Custom WebSocket hook with automatic reconnection and message queueing.",
          "Optimistic UI updates to mask blockchain transaction latency.",
          "Smart contract integration using Ethers.js with type-safe ABIs."
        ],
        outcome: "Zero downtime during peak auction events with over $2M processed volume in the first month.",
        stack: ["Next.js", "Redux Toolkit", "Socket.io", "Solidity"],
        images: ["https://picsum.photos/id/20/800/600", "https://picsum.photos/id/26/800/600", "https://picsum.photos/id/48/800/600"],
        link: "",
        repo: "",
      },
      {
        id: 103,
        title: "Gaia's Voice",
        shortDesc: "Edge-computed narrative engine for environmental data.",
        problem: "Generating personalized narratives based on user location and weather data introduced significant latency when processed on a traditional centralized server.",
        architecture: "Moved the logic to the Edge. We utilized Vercel Edge Functions to aggregate weather and location APIs closer to the user, then streamed the OpenAI response to the client to improve Perceived Performance.",
        highlights: [
          "Implemented Edge Caching strategies for static assets and API responses.",
          "Streaming HTML response for immediate Time-To-First-Byte (TTFB).",
          "Graceful degradation strategies for third-party API failures."
        ],
        outcome: "Achieved a Lighthouse Performance score of 98/100 despite heavy AI processing.",
        stack: ["React", "Vercel Edge", "OpenAI", "Redis"],
        images: ["https://picsum.photos/id/10/800/600", "https://picsum.photos/id/15/800/600", "https://picsum.photos/id/18/800/600"],
        link: "",
        repo: "",
      }
    ]
  },
  chat: {
    title: "Virtual Tech Lead",
    welcome: "I am the Virtual Tech Lead. Ask me about the system architecture, tech stack decisions, or development methodologies.",
    placeholder: "Ask about architecture, stacks...",
    thinking: "Analyzing request..."
  },
  footer: {
    ctaTitle: "Need Robust Engineering?",
    ctaDescription: "I provide architectural leadership and high-end development for complex digital products.",
    rights: "Lumina. Engineering Showcase."
  }
};

const ES_CONTENT: Content = {
  nav: {
    home: "Inicio",
    expertise: "Capacidades",
    projects: "Ingeniería",
    journey: "Evolución",
    contact: "Contacto"
  },
  hero: {
    greeting: "Hola, soy Javier.",
    role: "Arquitecto de Ideas.",
    description: "Detrás de cada gran idea, existe un código robusto. Soy Desarrollador Full Stack especializado en diseñar y programar soluciones de alto rendimiento, desde la base de datos hasta la interfaz de usuario.",
    ctaExplore: "Mis proyectos",
    ctaContact: "Contactar"
  },
  expertise: {
    title: "Expertise Técnico",
    subtitle: "Competencias clave en ingeniería de software moderna y arquitectura de sistemas.",
    items: [
      {
        id: "arch",
        title: "Arquitectura Escalable",
        description: "Diseño de arquitecturas modulares que sostienen el crecimiento a largo plazo. Aplico principios de código limpio y sistemas de diseño atómicos.",
        techList: ["Micro-frontends", "Monorepos", "State Machines"],
        icon: "architecture"
      },
      {
        id: "perf",
        title: "Ingeniería de Rendimiento",
        description: "Optimización profunda de Core Web Vitals. Me enfoco en rutas críticas de renderizado, análisis de bundles y gestión de memoria.",
        techList: ["Tree-shaking", "Web Workers", "WASM"],
        icon: "performance"
      },
      {
        id: "int",
        title: "Integraciones Complejas",
        description: "Conexión fluida de interfaces frontend con CMS headless, bases de datos de grafos y servicios backend en tiempo real.",
        techList: ["GraphQL", "WebSockets", "Serverless Functions"],
        icon: "integration"
      }
    ]
  },
  process: {
    title: "Workflow de Ingeniería",
    items: [
      {
        step: "01",
        title: "Descubrimiento Técnico",
        description: "Análisis de requerimientos del sistema, modelado de datos y selección del stack óptimo."
      },
      {
        step: "02",
        title: "Arquitectura y Diseño",
        description: "Definición de contratos API, jerarquías de componentes y pipelines CI/CD antes de codificar."
      },
      {
        step: "03",
        title: "Implementación Ágil",
        description: "Desarrollo iterativo con revisiones de código estrictas, pruebas automatizadas e integración continua."
      },
      {
        step: "04",
        title: "Despliegue y Escala",
        description: "Configuración de infraestructura, pruebas de carga y observabilidad para producción."
      }
    ]
  },
  journey: {
    title: "La Evolución",
    milestones: [
      {
        id: 1,
        year: "El Origen",
        title: "Fundamentos Algorítmicos",
        description: "Comenzó con la lógica pura de C++ y Python. Entender estructuras de datos, gestión de memoria y notación Big O me dio una apreciación permanente por la eficiencia antes de tocar el DOM.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 2,
        year: "La Expansión",
        title: "Desarrollo Full Stack",
        description: "Cerré la brecha entre servidor y cliente, dominando Node.js y SQL. Esta era se definió por construir aplicaciones CRUD completas y entender el ciclo de vida de una petición.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 3,
        year: "El Refinamiento",
        title: "Arquitectura Frontend",
        description: "A medida que las apps crecían, pivoté al diseño UI estructural. Profundicé en los internos de React, máquinas de estado y patrones de componentes para domar el caos.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 4,
        year: "La Escala",
        title: "Cloud & DevOps",
        description: "El código no vive en el vacío. Integré Docker, Kubernetes y pipelines CI/CD, asegurando que las arquitecturas diseñadas fueran desplegables, escalables y resilientes.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      },
      {
        id: 5,
        year: "El Presente",
        title: "Liderazgo Técnico",
        description: "Ahora construyo sistemas que construyen sistemas. Mi enfoque está en la toma de decisiones de alto nivel, mentoría de equipos e integración de IA para acelerar workflows.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  projects: {
    title: "Casos de Estudio",
    viewCaseStudy: "Ver Arquitectura",
    labels: {
      problem: "El Problema",
      architecture: "Arquitectura y Decisiones",
      highlights: "Highlights Técnicos",
      outcome: "Impacto de Negocio",
      stack: "Tech Stack"
    },
    items: [
      {
        id: 101,
        title: "Ethereal Finance",
        shortDesc: "Dashboard de trading de alta frecuencia con visualización WebGL.",
        problem: "El cliente necesitaba visualizar flujos de activos en tiempo real para miles de transacciones. El renderizado basado en DOM bloqueaba el hilo principal.",
        architecture: "Evitamos el DOM para la capa de datos, utilizando Three.js (WebGL). El estado se gestionó mediante un stream personalizado de RxJS para manejar actualizaciones de alta frecuencia sin reconciliaciones de React.",
        highlights: [
          "Renderizado instanciado para manejar 10k+ partículas a 60fps.",
          "Desacoplamiento de ingesta de datos usando Web Workers.",
          "Reducción de carga inicial del 40% vía code-splitting."
        ],
        outcome: "Herramienta de trading superior en velocidad, aumentando la sesión de usuario en un 45%.",
        stack: ["React", "Three.js", "RxJS", "Web Workers"],
        images: ["https://picsum.photos/id/1/800/600", "https://picsum.photos/id/2/800/600", "https://picsum.photos/id/3/800/600"],
        link: "",
        repo: "",
      },
      {
        id: 102,
        title: "Neon Nexus",
        shortDesc: "Marketplace descentralizado con motor de pujas en tiempo real.",
        problem: "La plataforma requería consistencia de datos absoluta para subastas en vivo. El polling estándar era lento y las conexiones WebSocket en micro-frontends creaban condiciones de carrera.",
        architecture: "Adoptamos un gestor de WebSocket centralizado. Usamos un store de Redux normalizado como fuente única de verdad, sincronizando actualizaciones optimistas con la consistencia eventual del blockchain.",
        highlights: [
          "Hook de WebSocket personalizado con reconexión automática.",
          "Actualizaciones de UI optimistas para enmascarar latencia.",
          "Integración de contratos inteligentes usando Ethers.js."
        ],
        outcome: "Cero tiempo de inactividad durante subastas pico con más de $2M procesados en el primer mes.",
        stack: ["Next.js", "Redux Toolkit", "Socket.io", "Solidity"],
        images: ["https://picsum.photos/id/20/800/600", "https://picsum.photos/id/26/800/600", "https://picsum.photos/id/48/800/600"],
        link: "",
        repo: "",
      },
      {
        id: 103,
        title: "Gaia's Voice",
        shortDesc: "Motor narrativo computed-at-edge para datos ambientales.",
        problem: "Generar narrativas personalizadas basadas en ubicación y clima introducía latencia significativa en servidores centralizados.",
        architecture: "Movimos la lógica al Edge. Utilizamos Vercel Edge Functions para agregar APIs cerca del usuario, y luego streaming de la respuesta de OpenAI para mejorar el Rendimiento Percibido.",
        highlights: [
          "Estrategias de Edge Caching para assets y APIs.",
          "Respuesta HTML en streaming para TTFB inmediato.",
          "Estrategias de degradación elegante para fallos de API."
        ],
        outcome: "Score de Performance Lighthouse de 98/100 a pesar del procesamiento pesado de IA.",
        stack: ["React", "Vercel Edge", "OpenAI", "Redis"],
        images: ["https://picsum.photos/id/10/800/600", "https://picsum.photos/id/15/800/600", "https://picsum.photos/id/18/800/600"],
        link: "",
        repo: "",
      }
    ]
  },
  chat: {
    title: "Tech Lead Virtual",
    welcome: "Soy el Tech Lead Virtual. Pregúntame sobre la arquitectura del sistema, decisiones de stack o metodologías de desarrollo.",
    placeholder: "Pregunta sobre arquitectura...",
    thinking: "Analizando..."
  },
  footer: {
    ctaTitle: "¿Necesitas Ingeniería Robusta?",
    ctaDescription: "Proporciono liderazgo arquitectónico y desarrollo de alta gama para productos digitales complejos.",
    rights: "Lumina. Engineering Showcase."
  }
};

export const CONTENT: Record<Language, Content> = {
  en: EN_CONTENT,
  es: ES_CONTENT
};