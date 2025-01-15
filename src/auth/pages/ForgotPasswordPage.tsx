import React, { useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import { AuthLayout } from "../layout/AuthLayout"
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxConfig"
import { ForgotPasswordForm } from "../interfaces/auth.interfaces"
import { startResetPasswordWithEmail } from "../../store/auth/thunks"
import { setResetPasswordCountdown } from "../../store/auth/authSlice"

export const ForgotPasswordPage = () => {
  // Hooks form -> react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>();

  // Hooks store -> redux
  const dispatch = useAppDispatch();
  
  // Hooks store -> redux
  const { status, errorMessage, resetPasswordCountdown } = useAppSelector(state => state.auth);

  // Function to handle the form submission
  const onSubmit = handleSubmit((data) => {
    dispatch(startResetPasswordWithEmail(data));
    dispatch(setResetPasswordCountdown(60));
  });

  // Effect to handle the countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resetPasswordCountdown > 0) {
      timer = setInterval(() => {
        dispatch(setResetPasswordCountdown(resetPasswordCountdown - 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resetPasswordCountdown, dispatch]);

  // Memo to check if the user is checking the authentication
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  // Render the component
  return (
    <AuthLayout title="forgot password">
      <form onSubmit={onSubmit}>
        <div className="w-full max-w-md mx-auto">
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

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
              placeholder="email@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-zinc-800 text-white rounded-sm hover:bg-zinc-900 focus:outline-none transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCheckingAuthentication || resetPasswordCountdown > 0}
            >
              {resetPasswordCountdown > 0 ? `retry in ${resetPasswordCountdown}s` : 'send reset instructions'}
            </button>
          </div>

          {/* Login Link */}
          <div className="flex items-center justify-end">
            <span className="text-gray-600 mr-2">remember your password?</span>
            <Link
              to="/auth/login"
              className="text-gray-600 hover:underline"
            >
              login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}