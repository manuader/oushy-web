/** Global site metadata, contact points and navigation. */

export const site = {
  name: "oushy studio",
  tagline: "estudio creativo integral",
  title: "oushy studio — estudio creativo integral",
  description:
    "OUSHY Studio es una agencia de marketing y branding especializada en construir marcas con identidad, estrategia y una comunicación que genera resultados.",
  url: "https://oushystudio.com",
  locale: "es_AR",
  location: "ARG ▸ WORKING GLOBALLY",
  year: 2026,
} as const;

export const contact = {
  whatsapp: "https://wa.me/5491156347162",
  instagram: "https://www.instagram.com/oushystudio/",
  instagramHandle: "@OUSHYSTUDIO",
} as const;

export const navLinks = [
  { label: "EL ESTUDIO", href: "#estudio" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "PROCESO", href: "#proceso" },
  { label: "INDUSTRIAS", href: "#industrias" },
] as const;

/** Section anchors, kept in one place so links and sections can never drift. */
export const sectionIds = {
  studio: "estudio",
  services: "servicios",
  process: "proceso",
  industries: "industrias",
  feed: "proyectos",
  contact: "contacto",
} as const;
