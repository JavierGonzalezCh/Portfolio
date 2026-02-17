import type { Content, Language } from './types';

const ES_CONTENT: Content = {
  nav: {
    home: "Inicio",
    expertise: "Stack",
    projects: "Proyectos",
    journey: "Trayectoria",
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
    title: "Mi Historia",
    milestones: [
      {
        id: 1,
        year: "Fundamentos",
        title: "Mentalidad de Ingeniería",
        description: "Antes de frameworks, entendí la lógica. Aprendí a descomponer problemas complejos, optimizar soluciones y pensar en eficiencia desde la raíz. Más que lenguajes, desarrollé criterio técnico.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 2,
        year: "Construcción",
        title: "Sistemas Funcionales Reales",
        description: "Pasé de ejercicios a soluciones completas: APIs robustas, modelos de datos sólidos y aplicaciones preparadas para crecer. Empecé a construir pensando en impacto, no solo en funcionalidad.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 3,
        year: "Arquitectura",
        title: "Diseño Escalable",
        description: "Aprendí a ordenar el caos. Diseñé sistemas modulares, mantenibles y claros. Entendí que una buena arquitectura no solo resuelve el presente, protege el futuro.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 4,
        year: "Complejidad",
        title: "Sistemas Inteligentes",
        description: "Desarrollé chatbots avanzados y software empresarial con lógica contextual, manejo de estados complejos e integración de IA. Sistemas que automatizan procesos reales y escalan bajo demanda.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      },
      {
        id: 5,
        year: "Hoy",
        title: "Dirección Técnica",
        description: "Actualmente lidero proyectos de principio a fin: traduzco necesidades de negocio en arquitectura sólida, tomo decisiones estratégicas y construyo soluciones listas para crecer.",
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
  es: ES_CONTENT
};