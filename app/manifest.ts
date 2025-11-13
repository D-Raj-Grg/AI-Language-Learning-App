import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LinguaChat - AI Language Learning",
    short_name: "LinguaChat",
    description: "Master conversations in Spanish, French, German, Italian, and Japanese with AI-powered language learning",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9333ea",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/favicon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["education", "productivity", "lifestyle"],
    lang: "en-US",
    dir: "ltr",
  };
}
