import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserAvatar(name?: string, email?: string, customAvatar?: string): string {
  // Normalize string by stripping diacritics (accents) for consistent matching
  const cleanName = name && name !== "undefined" && name !== "null" 
    ? name.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    : "";
  const cleanEmail = email && email !== "undefined" && email !== "null" ? email.toLowerCase().trim() : "";
  const cleanAvatar = customAvatar && customAvatar !== "undefined" && customAvatar !== "null" ? customAvatar.trim() : "";

  const VALID_SQUAD = new Set([
    "ana-sarmiento",
    "anyelina-araque",
    "bruno-dongu",
    "camila-leon",
    "claire-gonzalez",
    "cristobal-ramirez",
    "eduardo-villar",
    "gisell-acosta",
    "glenmarie-soto",
    "indhira-segura",
    "isak-aguirre",
    "lorena-munera",
    "luis-trujillo",
    "neomarlys-segura",
    "oscary-amaya",
    "patricio-araya",
    "pedro-borrome",
    "rafael-abreu",
    "sebastian-gonzales",
    "victoria-munera"
  ]);

  // 1. Prioritize squad overrides by matching normalized names or email keywords
  if (cleanName.includes("gnius")) return "/avatars/gnius.png";
  if (cleanName.includes("vibe")) return "/avatars/vibe.png";
  if (cleanName.includes("lumina")) return "/avatars/lumina.png";
  if (cleanName.includes("aura")) return "/avatars/aura.png";
  if (cleanName.includes("venus")) return "/avatars/venus.png";
  if (cleanName.includes("kronos")) return "/avatars/kronos.png";
  if (cleanName.includes("zeus")) return "/avatars/zeus.png";
  if (cleanName.includes("nexus")) return "/avatars/nexus.png";
  if (cleanName.includes("orbit")) return "/avatars/orbit.png";
  if (cleanName.includes("nibble")) return "/avatars/nibble.png";
  if (cleanName.includes("nova")) return "/avatars/nova.png";
  if (cleanName.includes("echo")) return "/avatars/echo.png";

  if (cleanName.includes("bruno") && cleanName.includes("dongu")) {
    return "/avatars/squad/bruno-dongu.png";
  }
  if (
    cleanName.includes("administracion") || 
    cleanName.includes("ceo") || 
    cleanName === "administracion gmedia" || 
    cleanName === "administracion gm" ||
    cleanEmail.includes("administracion") ||
    cleanEmail.includes("ceo")
  ) {
    return "/avatars/squad/bruno-dongu.png";
  }
  if (cleanName.includes("gisell") || cleanEmail.includes("g.acosta") || cleanEmail.includes("g-silva") || cleanName === "gi" || cleanName === "gisell acosta") {
    return "/avatars/squad/gisell-acosta.png";
  }
  if (cleanName.includes("camila") || cleanName.includes("leon") || cleanEmail.includes("c.leon") || cleanEmail.includes("camila")) {
    return "/avatars/squad/camila-leon.png";
  }
  if (cleanName.includes("claire") || cleanEmail.includes("c.gonzalez") || cleanName === "cl") {
    return "/avatars/squad/claire-gonzalez.png";
  }
  if (cleanName.includes("glen") || cleanName.includes("glenmarie") || cleanName === "gl") {
    return "/avatars/squad/glenmarie-soto.png";
  }
  if (cleanName.includes("victoria") || cleanEmail.includes("v.munera")) {
    return "/avatars/squad/victoria-munera.png";
  }
  if (cleanName.includes("anyelina") || cleanName.includes("araque") || cleanName.includes("gloritzabel") || cleanEmail.includes("a.araque")) {
    return "/avatars/squad/anyelina-araque.png";
  }
  if (cleanName.includes("neomarly") || cleanEmail.includes("n.segura")) {
    return "/avatars/squad/neomarlys-segura.png";
  }
  if (cleanName.includes("isak") || cleanName.includes("aguirre") || cleanEmail.includes("i.aguirre")) {
    return "/avatars/squad/isak-aguirre.png";
  }
  if (cleanName.includes("eduardo") || cleanName.includes("villar") || cleanEmail.includes("e.villanueva")) {
    return "/avatars/squad/eduardo-villar.png";
  }
  if (cleanName.includes("rafael") || cleanName.includes("abreu") || cleanEmail.includes("r.abreu")) {
    return "/avatars/squad/rafael-abreu.png";
  }
  if (cleanName.includes("patricio") || cleanName.includes("araya") || cleanEmail.includes("p.araya")) {
    return "/avatars/squad/patricio-araya.png";
  }
  if (cleanName.includes("oscary") || cleanName.includes("amaya") || cleanEmail.includes("o.amaya")) {
    return "/avatars/squad/oscary-amaya.png";
  }
  if (cleanName.includes("pedro") || cleanName.includes("borrome") || cleanEmail.includes("p.borrome")) {
    return "/avatars/squad/pedro-borrome.png";
  }
  if (cleanName.includes("luis") || cleanName.includes("trujillo") || cleanEmail.includes("l.trujillo") || cleanName.includes("anthony")) {
    return "/avatars/squad/luis-trujillo.png";
  }
  if (cleanName.includes("ana") || cleanName.includes("sarmiento") || cleanEmail.includes("a.sarmiento") || cleanName.includes("nuevo-dev")) {
    return "/avatars/squad/ana-sarmiento.png";
  }
  if (cleanName.includes("sebastian") || cleanName.includes("gonzales") || cleanName.includes("gonzalez") || cleanEmail.includes("s.gonzalez")) {
    return "/avatars/squad/sebastian-gonzales.png";
  }
  if (cleanName.includes("lorena") || cleanEmail.includes("l.munera")) {
    return "/avatars/squad/lorena-munera.png";
  }
  if (cleanName.includes("cristobal") || cleanName.includes("ramirez")) {
    return "/avatars/squad/cristobal-ramirez.png";
  }
  if (cleanName.includes("indhira") || cleanName.includes("segura")) {
    return "/avatars/squad/indhira-segura.png";
  }

  // 2. If no squad match, fall back to the custom avatar URL if it is a valid URL or path
  if (cleanAvatar && (cleanAvatar.startsWith("http") || cleanAvatar.startsWith("/"))) {
    return cleanAvatar;
  }

  // 3. Fallback to slugifying the name and checking if it matches a valid squad photo
  if (cleanName) {
    const slug = cleanName
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    
    // Check if slug matches exactly or matches partly
    for (const member of VALID_SQUAD) {
      if (member === slug || slug.includes(member) || member.includes(slug)) {
        return `/avatars/squad/${member}.png`;
      }
    }
  }

  return "";
}
