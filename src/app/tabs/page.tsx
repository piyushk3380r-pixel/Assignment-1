'use client';

import { useEffect, useState } from 'react';
import TabsBuilder from '@/components/TabsBuilder';

type Theme = 'light' | 'dark';
const THEME_KEY = 'site_theme';

function applyTheme(theme: Theme) {
  // Set the Bootstrap 5.3 theme attribute on the root <html>
  document.documentElement.setAttribute('data-bs-theme', theme);
}

export default function TabsPage() {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from localStorage (default: light)
  useEffect(() => {
    try {
      const saved = (localStorage.getItem(THEME_KEY) as Theme) || 'light';
      setTheme(saved);
      applyTheme(saved);
    } catch {
      // fall back to the light theme
      setTheme('light');
      applyTheme('light');
    }
  }, []);

  // Handle user switching theme
  const onChangeTheme = (value: Theme) => {
    setTheme(value);
    applyTheme(value);
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch {
      
    }
  };

  return (
    <>
      {/* theme switch */}
      <section className="mb-4" aria-labelledby="theme-heading">
        <h2 id="theme-heading" className="h5 mb-2">Theme</h2>

        {/* Radio group  */}
        <div role="radiogroup" aria-label="Theme selection">
          <div className="btn-group" role="group" aria-label="Theme options">
            <input
              type="radio"
              className="btn-check"
              name="theme"
              id="theme-light"
              autoComplete="off"
              checked={theme === 'light'}
              onChange={() => onChangeTheme('light')}
            />
            <label className="btn btn-outline-primary" htmlFor="theme-light">
              Light
            </label>

            <input
              type="radio"
              className="btn-check"
              name="theme"
              id="theme-dark"
              autoComplete="off"
              checked={theme === 'dark'}
              onChange={() => onChangeTheme('dark')}
            />
            <label className="btn btn-outline-primary" htmlFor="theme-dark">
              Dark
            </label>
          </div>
        </div>

        <p className="text-muted mt-2 mb-0">
          Light: light background, dark text. Dark: dark background, light text.
        </p>
      </section>

      {/* render the TabsBuilder */}
      <TabsBuilder />
    </>
  );
}
