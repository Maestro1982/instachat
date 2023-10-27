import { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiCommand } from 'react-icons/fi';

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

import DarkModeToggle from '@/components/DarkModeToggle';

import { SignUpValidation } from '@/lib/validation';
import { z } from 'zod';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <div className='flex items-center justify-center mb-2'>
          <img
            src='/assets/images/black.svg'
            alt='logo'
            width={35}
            height={35}
            className='dark:filter dark:invert'
          />
          <span className='text-2xl md:text-3xl ml-1 font-semibold dark:filter dark:text-white'>
            InstaChat
          </span>
        </div>
        <DarkModeToggle />
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
            {isLoading ? (
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
