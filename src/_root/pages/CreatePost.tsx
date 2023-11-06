import PostForm from '@/components/forms/PostForm';

import { useTheme } from '@/components/ThemeProvider';

const CreatePost = () => {
  const { theme } = useTheme(); // Get the current theme from the context
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
            src='/assets/icons/add-post.svg'
            alt='add'
            height={36}
            width={36}
            className={`${theme === 'light' ? 'filter invert' : ''}`}
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm action='Create' />
      </div>
    </div>
  );
};
export default CreatePost;
