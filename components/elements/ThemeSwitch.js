import { useEffect, useState } from 'react';
import { themeUtils } from '../../util/themeInitializer';

export default function ThemeSwitch() {
  const [toggleTheme, setToggleTheme] = useState(() =>
    themeUtils.getCurrentTheme()
  );

  useEffect(() => {
    themeUtils.setTheme(toggleTheme);
  }, [toggleTheme]);

  const handleThemeToggle = () => {
    const newTheme =
      toggleTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    setToggleTheme(newTheme);
  };

  return (
    <>
      <nav className='switcher__tab' onClick={handleThemeToggle}>
        <span className='switcher__btn light-mode'>
          <i className='flaticon-sun' />
        </span>
        <span className='switcher__mode' />
        <span className='switcher__btn dark-mode'>
          <i className='flaticon-moon' />
        </span>
      </nav>
    </>
  );
}
