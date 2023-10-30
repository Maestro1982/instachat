import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
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
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={() => signOut()}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Topbar;
