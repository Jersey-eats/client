import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jersey Eats",
    short_name: "Jersey Eats",
    description: "The island's food, delivered well.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF5E6",
    theme_color: "#FFF5E6",
    categories: ["food", "lifestyle", "shopping"],
    icons: [
      { src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
