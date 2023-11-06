import { useParams } from 'react-router-dom';

import PostForm from '@/components/forms/PostForm';
import Loader from '@/components/shared/Loader';

import { useTheme } from '@/components/ThemeProvider';

import { usegetPostById } from '@/lib/react-query/queriesAndMutations';

const EditPost = () => {
  const { theme } = useTheme(); // Get the current theme from the context
  const { id } = useParams();
  const { data: post, isPending } = usegetPostById(id || '');

  if (isPending) return <Loader />;

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
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <PostForm action='Update' post={post} />
      </div>
    </div>
  );
};
export default EditPost;
