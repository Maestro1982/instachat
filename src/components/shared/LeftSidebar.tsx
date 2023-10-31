import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

import DarkModeToggle from '@/components/DarkModeToggle';
import { useTheme } from '@/components/ThemeProvider';

import { Button } from '@/components/ui/button';

import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { theme } = useTheme(); // Get the current theme from the context
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess)
      /* Navigates to the sign-in or sign-up page */
      navigate(0);
  }, [isSuccess]);

  return (
    <nav className={`leftsidebar ${theme === 'dark' ? 'dark' : ''}`}>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/black.svg'
            alt='logo'
            width={30}
            height={30}
            className='dark:filter dark:invert'
          />
          <span className='text-xl md:text-2xl font-semibold dark:filter dark:text-white'>
            InstaChat
          </span>
          <DarkModeToggle />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
            alt='profile'
            className='h-12 w-12 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-indigo-300 dark:bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${
                      isActive && theme === 'light' ? 'filter invert' : ''
                    } ${isActive && theme === 'dark' ? 'invert-white' : ''}
                    ${
                      theme === 'light'
                        ? 'group-hover:filter invert'
                        : 'group-hover:invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant='ghost'
        className='shad-button_ghost'
        onClick={() => signOut()}
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Sign Out</p>
      </Button>
    </nav>
  );
};
export default LeftSidebar;
