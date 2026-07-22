export const theme = {
  colors: {
    // Cor principal do sistema
    primary: "#7C3AED",
    primaryHover: "#6D28D9",
    primaryLight: "#EDE9FE",

    // Fundo
    background: "#F8FAFC",
    surface: "#FFFFFF",

    // Textos
    text: "#18181B",
    textSecondary: "#52525B",
    textMuted: "#71717A",

    // Bordas
    border: "#E4E4E7",

    // Estados
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.12)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
};

export type Theme = typeof theme;