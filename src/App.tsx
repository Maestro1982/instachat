import { Routes, Route } from 'react-router-dom';
import './globals.css';

import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';

import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';

import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from './components/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <main className='flex h-screen'>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm />} />
          </Route>

          {/* Private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </ThemeProvider>
  );
};
export default App;
