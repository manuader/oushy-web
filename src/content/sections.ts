/**
 * Editorial copy for every section of the landing page.
 * Keeping it out of the components makes the sections pure presentation and
 * lets copy be edited without touching markup.
 */

export const hero = {
  eyebrow: "ESTUDIO CREATIVO INTEGRAL",
  claim: "Creamos, producimos y potenciamos tu marca",
  disciplines: "MARKETING DIGITAL · ESTRATEGIA & META ADS · BRANDING · CONTENIDO",
  primaryCta: "INICIAR PROYECTO ↗",
  secondaryCta: "VER SERVICIOS",
} as const;

export const heroMarquee = [
  "branding",
  "identidad visual",
  "redes sociales",
  "contenido ugc",
  "meta ads",
  "dirección creativa",
  "estrategia",
  "producción audiovisual",
] as const;

export const studio = {
  index: "01",
  label: "EL ESTUDIO",
  headline:
    "OUSHY Studio es una agencia de marketing y branding especializada en construir marcas con identidad, estrategia y una comunicación que genera resultados.",
  note: "no existen las fórmulas universales",
  paragraphs: [
    "Trabajamos de manera integral, acompañando a cada cliente desde la estrategia hasta la ejecución. Creemos que no existen las fórmulas universales: cada marca tiene objetivos, desafíos y necesidades diferentes. Por eso desarrollamos planes de trabajo personalizados, donde cada decisión responde a una estrategia clara y medible.",
    "Nuestro equipo reúne profesionales de distintas áreas para ofrecer un servicio completo, permitiendo que nuestros clientes deleguen toda su comunicación en un solo lugar.",
  ],
} as const;

import type { ServiceIconName } from "@/lib/brand";

export interface Service {
  index: string;
  title: string;
  items: string[];
  icon: ServiceIconName;
}

export const servicesSection = {
  index: "02",
  label: "SERVICIOS",
  title: "servicios",
  note: "todo en un mismo lugar",
} as const;

export const services: Service[] = [
  {
    index: "01",
    title: "estrategia",
    icon: "estrategia",
    items: [
      "Estrategia de marca y posicionamiento",
      "Consultoría y acompañamiento estratégico",
      "Planificación y calendarización de contenido",
    ],
  },
  {
    index: "02",
    title: "identidad",
    icon: "identidad",
    items: [
      "Branding e identidad visual",
      "Dirección creativa",
      "Diseño gráfico",
      "Desarrollo de piezas para medios digitales e impresos",
    ],
  },
  {
    index: "03",
    title: "contenido",
    icon: "contenido",
    items: [
      "Gestión integral de redes sociales",
      "Producción y edición de contenido audiovisual",
      "Reels, fotografía y contenido UGC",
      "Redacción de copies",
    ],
  },
  {
    index: "04",
    title: "performance",
    icon: "performance",
    items: ["Publicidad en Meta Ads", "Lanzamientos y campañas"],
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  caption: string;
}

export const processSection = {
  index: "03",
  label: "CÓMO TRABAJAMOS",
  titleLines: ["de la estrategia", "a la ejecución"],
  outro:
    "Nos ocupamos de planificar, crear, ejecutar y optimizar cada acción para que la marca mantenga una presencia consistente y de alto nivel.",
} as const;

export const processSteps: ProcessStep[] = [
  { index: "01", title: "planificar", caption: "ESTRATEGIA Y CALENDARIO" },
  { index: "02", title: "crear", caption: "DISEÑO Y PRODUCCIÓN" },
  { index: "03", title: "ejecutar", caption: "PUBLICACIÓN Y CAMPAÑAS" },
  { index: "04", title: "optimizar", caption: "ANÁLISIS Y MEJORA" },
];

export const industriesSection = {
  index: "04",
  label: "INDUSTRIAS",
  intro:
    "A lo largo de nuestra trayectoria trabajamos con empresas de diferentes industrias, tanto en Argentina como en el exterior.",
  outro:
    "Esta diversidad nos permitió adquirir una visión estratégica adaptable a distintos mercados y públicos.",
} as const;

/** Two counter-scrolling rows of industries. */
export const industryRows = [
  ["consumo masivo", "bienestar", "salud", "belleza", "gastronomía"],
  ["aviación privada", "deporte de alto rendimiento", "tecnología", "retail"],
] as const;

export const manifesto = {
  label: "MANIFIESTO",
  headline:
    "Más que generar contenido, buscamos construir marcas sólidas, coherentes y memorables.",
  body: "Nuestro objetivo es que cada cliente cuente con una estrategia de comunicación alineada con su negocio, capaz de diferenciarlo en un mercado cada vez más competitivo.",
} as const;

/**
 * A curated feed slide. These are used whenever the Instagram API is not
 * configured — which is the normal case unless INSTAGRAM_ACCESS_TOKEN is set.
 *
 * To publish one: drop the image in `public/feed/` and fill in `src`.
 * Entries without a `src` render as an empty placeholder tile, so the carousel
 * keeps its rhythm while the set is still being filled in.
 */
export interface FeedPost {
  id: string;
  /** Path under /public, e.g. "/feed/post-01.jpg". */
  src?: string;
  alt: string;
  /** Link to the post on Instagram. Defaults to the profile. */
  permalink?: string;
}

export const feedSection = {
  index: "05",
  label: "PROYECTOS",
  title: "el feed",
  intro: "Proyectos, procesos y contenido del estudio, en movimiento.",
  cta: "VER EN INSTAGRAM ↗",
} as const;

export const feedPosts: FeedPost[] = [
  // Reemplazá cada entrada por una publicación real:
  //   { id: "verano-25", src: "/feed/verano-25.jpg", alt: "Campaña de verano para …",
  //     permalink: "https://www.instagram.com/p/XXXXXXXXX/" },
  { id: "post-01", alt: "Publicación 01 de OUSHY Studio" },
  { id: "post-02", alt: "Publicación 02 de OUSHY Studio" },
  { id: "post-03", alt: "Publicación 03 de OUSHY Studio" },
  { id: "post-04", alt: "Publicación 04 de OUSHY Studio" },
  { id: "post-05", alt: "Publicación 05 de OUSHY Studio" },
  { id: "post-06", alt: "Publicación 06 de OUSHY Studio" },
  { id: "post-07", alt: "Publicación 07 de OUSHY Studio" },
  { id: "post-08", alt: "Publicación 08 de OUSHY Studio" },
  { id: "post-09", alt: "Publicación 09 de OUSHY Studio" },
  { id: "post-10", alt: "Publicación 10 de OUSHY Studio" },
];

export const contactSection = {
  index: "06",
  label: "CONTACTO",
  title: "trabajemos",
  script: "juntos",
  body: "En OUSHY Studio entendemos el marketing como una herramienta de crecimiento. Nos involucramos en cada proyecto como parte del equipo de nuestros clientes, aportando creatividad, análisis y una ejecución cuidada en cada detalle.",
  cta: "INICIAR PROYECTO ↗",
} as const;
