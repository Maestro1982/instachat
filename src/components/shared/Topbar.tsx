import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import DarkModeToggle from '@/components/DarkModeToggle';

import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';

import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess)
      /* Navigates to the sign-in or sign-up page */
      navigate(0);
  }, [isSuccess]);

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/black.svg'
            alt='logo'
            width={35}
            height={35}
            className='dark:filter dark:invert'
          />
          <span className='text-2xl md:text-3xl font-semibold dark:filter dark:text-white'>
            InstaChat
          </span>
        </Link>

        <div className='flex gap-4'>
          <DarkModeToggle />
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={() => signOut()}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img
              src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Topbar;
