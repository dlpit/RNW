import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Sử dụng class để kích hoạt dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        bai: ['Bai Jamjuree', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        clan: {
          // Gold colors
          gold: "#FFD700",
          "gold-light": "#FFDD33",
          "gold-dark": "#D4AF37",
          
          // Orange colors
          orange: "#FF7A00",
          "orange-light": "#FF9933",
          "orange-dark": "#E56717",
          
          // Red colors
          red: "#FF3A30",
          "red-light": "#FF5C5C",
          "red-dark": "#D32F2F",
          
          // Dark theme colors
          dark: "#0D111C",
          "dark-accent": "#1A1F2C",
          "dark-surface": "#12151F",
          "dark-border": "#2A3042",
          "dark-text": "#E0E0E0",
          "dark-text-secondary": "#A0A0A0",
          
          // Light theme colors
          light: "#FFFFFF",
          "light-accent": "#F9FAFB",
          "light-surface": "#F5F7FA",
          "light-border": "#E5E7EB",
          "light-text": "#111827",
          "light-text-secondary": "#4B5563",
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to bottom, rgba(13, 17, 28, 0.7), rgba(13, 17, 28, 0.9)), url("/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png")',
        'hero-pattern-light': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.9)), url("/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png")',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-gold-light': 'linear-gradient(135deg, #FFDD33 0%, #FF9933 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D111C 0%, #1A1F2C 100%)',
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)',
        'card-dark': 'linear-gradient(145deg, #12151F 0%, #1A1F2C 100%)',
        'card-light': 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    }
  },
  plugins: [],
} satisfies Config;