import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1180px" } },
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Hanken Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // Stat! game accents (from the real app)
        syndrome: "hsl(var(--syndrome))",
        traits: "hsl(var(--traits))",
        associations: "hsl(var(--associations))",
        tangent: "hsl(var(--tangent))",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 4px)", sm: "calc(var(--radius) - 8px)" },
      keyframes: {
        ping2: { "0%": { boxShadow: "0 0 0 0 hsl(var(--traits)/.55)" }, "70%,100%": { boxShadow: "0 0 0 9px hsl(var(--traits)/0)" } },
        float: { "0%,100%": { transform: "translateY(0) rotate(-1.2deg)" }, "50%": { transform: "translateY(-16px) rotate(-1.2deg)" } },
        rise: { from: { opacity: "0", transform: "translateY(30px)" }, to: { opacity: "1", transform: "none" } },
        sweep: { from: { backgroundPosition: "0% 50%" }, to: { backgroundPosition: "200% 50%" } },
      },
      animation: {
        ping2: "ping2 2.4s ease-out infinite",
        float: "float 7s cubic-bezier(.2,.8,.2,1) infinite",
        rise: "rise .8s cubic-bezier(.2,.8,.2,1) both",
        sweep: "sweep 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
