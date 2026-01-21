import { commands } from '../constants/commands';
import type { Themes } from '../types';

const availableCommands = commands.map((c) => c.cmd);
const availableThemes: Themes[] = [
  'dark',
  'light',
  'green-goblin',
  'blue-matrix',
  'espresso',
  'ubuntu',
];

const findCommonPrefix = (items: string[]): string => {
  if (items.length === 0) return '';
  return items.reduce((acc, curr) => {
    let i = 0;
    while (i < acc.length && i < curr.length && acc[i] === curr[i]) i++;
    return acc.slice(0, i);
  });
};

export const useAutocomplete = (inputValue: string, setInputValue: (value: string) => void) => {
  const autocomplete = () => {
    const currentInput = inputValue.trim().toLowerCase();
    if (!currentInput) return;

    // Check if typing "themes set <theme>"
    if (currentInput.startsWith('themes set ')) {
      const themePrefix = currentInput.replace('themes set ', '');
      const matchingThemes = availableThemes.filter((t) => t.startsWith(themePrefix));

      if (matchingThemes.length === 1) {
        setInputValue(`themes set ${matchingThemes[0]}`);
      } else if (matchingThemes.length > 1) {
        const commonPrefix = findCommonPrefix(matchingThemes);
        if (commonPrefix.length > themePrefix.length) {
          setInputValue(`themes set ${commonPrefix}`);
        }
      }
      return;
    }

    // Autocomplete commands
    const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(currentInput));

    if (matchingCommands.length === 1) {
      setInputValue(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      const commonPrefix = findCommonPrefix(matchingCommands);
      if (commonPrefix.length > currentInput.length) {
        setInputValue(commonPrefix);
      }
    }
  };

  return { autocomplete };
};
