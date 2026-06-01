'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ isHome = true, scrolled = false }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  // White when navbar is dark, dark when navbar is light
  const isLight = isHome && scrolled && theme === 'light';
  const iconColor = isLight ? 'text-zinc-700' : 'text-white';
  const hoverBg = isLight ? 'hover:bg-zinc-100' : 'hover:bg-white/10';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center ${iconColor} ${hoverBg} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 ${iconColor} transition-all duration-500 ${
            theme === 'light'
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 ${iconColor} transition-all duration-500 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
}
