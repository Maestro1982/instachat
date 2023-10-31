import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiCommand } from 'react-icons/fi';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { SignUpValidation } from '@/lib/validation';
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutations';

import { useUserContext } from '@/context/AuthContext';

const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: 'Sign Up Failed. Please try again.',
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: 'Sign In Failed. Please try again.' });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate('/');
    } else {
      return toast({ title: 'Sign Up Failed. Please try again.' });
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <div className='flex items-center justify-center mb-2 gap-3'>
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
        </div>
        <h2 className='h3-bold md:h2-bold dark:filter dark:text-white pt-5'>
          Create a new account
        </h2>
        <p className='text-light-3 small-medium md:base-regular'>
          To use InstaChat, please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='shad-input dark:shad-input-dark'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='shad-input dark:shad-input-dark'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    className='shad-input dark:shad-input-dark'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='shad-input dark:shad-input-dark'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shad-button_primary'>
            {isCreatingUser || isSigningIn || isUserLoading ? (
              <div className='flex-center gap-2'>
                <FiCommand className='loading-icon flex-center w-full' />{' '}
                Loading...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <p className='text-small-regular text-light-4 dark:text-light-2 text-center mt-2'>
            Already an account?{' '}
            <Link
              to='/sign-in'
              className='text-primary-600 dark:text-primary-500 text-small-semibold ml-1 hover:underline'
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignUpForm;
