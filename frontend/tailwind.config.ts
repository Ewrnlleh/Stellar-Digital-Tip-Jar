import type { Config } from "tailwindcss";

const config: Config = {
// BU KISIM EN ÖNEMLİSİDİR.
// Tailwind'e, stilleri uygulamak için hangi dosyaları
// taraması gerektiğini tam olarak belirtiyoruz.
content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Veya daha spesifik olarak:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
    extend: {},
},
plugins: [],
};
export default config;
