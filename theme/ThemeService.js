// theme/ThemeService.js

import Theme from "./Theme";

export function useTheme() {
  return Theme;
}

export function getColor(name) {
  return Theme.colors[name] || "#ffffff";
}

export function getSize(name) {
  return Theme.sizes[name] || 0;
}

