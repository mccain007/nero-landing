/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nero: {
          bg:    "#0B0D12",
          bg2:   "#0F1219",
          text:  "#E7ECF3",
          text2: "#A0A3B0",
          accent:"#7C3AED",
          teal:  "#3BF5C7",
          success:"#58E6B1",
          alert: "#FF6B6B",
          border:"#1B2030",
          card:  "#111522"
        }
      },
      fontFamily: {
        display: ["Satoshi","Urbanist","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","Liberation Sans","sans-serif"],
        body:    ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","Liberation Sans","sans-serif"],
        mono:    ["IBM Plex Mono","ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","monospace"]
      },
      keyframes: {
        "fx-drift": {
          "0%":   { transform: "translate3d(0,0,0) scale(1)" },
          "50%":  { transform: "translate3d(2%,2%,0) scale(1.06)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" }
        },
        "link-draw": {
          "0%,100%": { strokeDashoffset: "60", opacity: ".25" },
          "45%":     { strokeDashoffset: "0",  opacity: "1" },
          "65%":     { strokeDashoffset: "0",  opacity: ".9" }
        },
        "node-pulse": {
          "0%":   { transform: "scale(.82)", opacity: ".65" },
          "100%": { transform: "scale(1.18)", opacity: "1" }
        }
      },
      animation: {
        "fx-drift": "fx-drift 4s cubic-bezier(.45,0,.55,1) infinite",
        "link-draw": "link-draw 3.8s cubic-bezier(.45,0,.55,1) infinite",
        "node-pulse": "node-pulse 2.2s cubic-bezier(.45,0,.55,1) infinite alternate"
      },
      borderRadius: {
        lg: "22px", md: "16px", sm: "10px"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,.35)",
        "glow-violet": "0 0 24px rgba(124,58,237,.35)",
        "glow-teal": "0 0 24px rgba(59,245,199,.28)"
      }
    }
  },
  plugins: []
};

