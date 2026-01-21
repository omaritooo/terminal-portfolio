import type { Themes } from '../types';

type ThemeColors = {
  body: string;
  primary: string;
  secondary: string;
  text100: string;
  text200: string;
  text300: string;
  scrollHandle: string;
  scrollHandleHover: string;
};

const themeMap: Record<Themes, ThemeColors> = {
  dark: {
    body: 'bg-dark-body',
    primary: 'text-dark-primary',
    secondary: 'text-dark-secondary',
    text100: 'text-dark-text-100',
    text200: 'text-dark-text-200',
    text300: 'text-dark-text-300',
    scrollHandle: 'bg-dark-scroll-handle',
    scrollHandleHover: 'bg-dark-scroll-handle-hover',
  },
  light: {
    body: 'bg-light-body',
    primary: 'text-light-primary',
    secondary: 'text-light-secondary',
    text100: 'text-light-text-100',
    text200: 'text-light-text-200',
    text300: 'text-light-text-300',
    scrollHandle: 'bg-light-scroll-handle',
    scrollHandleHover: 'bg-light-scroll-handle-hover',
  },
  'blue-matrix': {
    body: 'bg-blue-matrix-body',
    primary: 'text-blue-matrix-primary',
    secondary: 'text-blue-matrix-secondary',
    text100: 'text-blue-matrix-text-100',
    text200: 'text-blue-matrix-text-200',
    text300: 'text-blue-matrix-text-300',
    scrollHandle: 'bg-blue-matrix-scroll-handle',
    scrollHandleHover: 'bg-blue-matrix-scroll-handle-hover',
  },
  espresso: {
    body: 'bg-espresso-body',
    primary: 'text-espresso-primary',
    secondary: 'text-espresso-secondary',
    text100: 'text-espresso-text-100',
    text200: 'text-espresso-text-200',
    text300: 'text-espresso-text-300',
    scrollHandle: 'bg-espresso-scroll-handle',
    scrollHandleHover: 'bg-espresso-scroll-handle-hover',
  },
  'green-goblin': {
    body: 'bg-green-goblin-body',
    primary: 'text-green-goblin-primary',
    secondary: 'text-green-goblin-secondary',
    text100: 'text-green-goblin-text-100',
    text200: 'text-green-goblin-text-200',
    text300: 'text-green-goblin-text-300',
    scrollHandle: 'bg-green-goblin-scroll-handle',
    scrollHandleHover: 'bg-green-goblin-scroll-handle-hover',
  },
  ubuntu: {
    body: 'bg-ubuntu-body',
    primary: 'text-ubuntu-primary',
    secondary: 'text-ubuntu-secondary',
    text100: 'text-ubuntu-text-100',
    text200: 'text-ubuntu-text-200',
    text300: 'text-ubuntu-text-300',
    scrollHandle: 'bg-ubuntu-scroll-handle',
    scrollHandleHover: 'bg-ubuntu-scroll-handle-hover',
  },
};

export const getThemeColors = (theme: Themes): ThemeColors => {
  return themeMap[theme];
};

export const getCaretColor = (theme: Themes): string => {
  const caretMap: Record<Themes, string> = {
    dark: 'caret-dark-primary',
    light: 'caret-light-primary',
    'blue-matrix': 'caret-blue-matrix-primary',
    espresso: 'caret-espresso-primary',
    'green-goblin': 'caret-green-goblin-primary',
    ubuntu: 'caret-ubuntu-primary',
  };
  return caretMap[theme];
};
