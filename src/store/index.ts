import { create } from 'zustand';
import type { Themes } from '../types';
import { devtools } from 'zustand/middleware';

type UiStore = {
  theme: Themes;
  changeTheme: (newTheme: Themes) => void;
};

export const useUiStore = create<UiStore>()(
  devtools((set) => ({
    theme: 'ubuntu',
    changeTheme: (newTheme: Themes) => set(() => ({ theme: newTheme }), undefined, 'Change theme'),
  }))
);
