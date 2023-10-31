import { Link, useLocation } from 'react-router-dom';

import { bottombarLinks } from '@/constants';

import { useTheme } from '@/components/ThemeProvider';

const Bottombar = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme(); // Get the current theme from the context
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && 'bg-indigo-200 dark:bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${
                isActive && theme === 'light' ? 'filter invert' : ''
              } ${isActive && theme === 'dark' ? 'invert-white' : ''}
                    ${
                      theme === 'light'
                        ? 'group-hover:filter invert'
                        : 'group-hover:invert-white'
                    }`}
            />
            <p className='tiny-medium text-black dark:text-light-2'>
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};
export default Bottombar;
