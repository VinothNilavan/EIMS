import { createContext } from 'react';

export const ThemeContext = createContext({
  name: '',
  setTheme: () => { console.log('theme log'); }
});
