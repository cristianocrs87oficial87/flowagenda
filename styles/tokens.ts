// FlowAgenda Design System

import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const tokens = {
  colors,
  spacing,
  typography,

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 8px rgba(0,0,0,0.08)",
    lg: "0 10px 20px rgba(0,0,0,0.10)",
  },

  transition: {
    default: "all .2s ease",
  },
};