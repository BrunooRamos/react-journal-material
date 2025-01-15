import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/useReduxConfig';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

import { AuthLayout } from '../layout/AuthLayout';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  // Hooks form -> react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  // Hooks store -> redux
  const dispatch = useAppDispatch();

  // Hooks store -> redux 
  const { status, errorMessage  } = useAppSelector( state => state.auth );

  // Function to handle the form submission
  const onSubmit = handleSubmit((data) => {
    console.log('Form Data:', data);
    dispatch(startLoginWithEmailPassword(data));
  });
  

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  // Memo to check if the user is checking the authentication
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]); 

  return (
    <AuthLayout title="login">
      <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
        <div className="w-full max-w-md mx-auto">

          {/* Email Field */}
          <div className="mb-4">
            <input
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email',
                },
              })}
              type="email"
              name="email"
              placeholder="email@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>


          {/* Password Field */}
          <div className="mb-4">
            <input
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'The password must have at least 6 characters',
                },
              })}
              type="password"
              name="password"
              placeholder="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Add Error Message Display */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{errorMessage}</p>
            </div>
          )}


          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-sm hover:bg-zinc-900 focus:outline-none transition-colors"
                disabled={ isCheckingAuthentication }
              >
                login
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-sm hover:bg-zinc-900 focus:outline-none transition-colors flex items-center justify-center"
                disabled={ isCheckingAuthentication }
                onClick={ onGoogleSignIn }
              >
                <img
                  src="/src/assets/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <span>google</span>
              </button>

            </div>
          </div>

          {/* Links container */}
          <div className="flex justify-between items-center">
            <Link
              to="/auth/forgot-password"
              className="text-gray-600 hover:underline"
            >
              forgot password?
            </Link>
            <Link
              to="/auth/register"
              className="text-gray-600 hover:underline"
            >
              create account
            </Link>
          </div>

        </div>
      </form>
    </AuthLayout>
  );
};
