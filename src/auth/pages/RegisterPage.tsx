import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxConfig';
import { startRegisterUserWithEmailPassword } from '../../store/auth/thunks';

interface RegisterForm {
  displayName: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  // Hooks form -> react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  // Hooks store -> redux
  const dispatch = useAppDispatch();

  // Hooks store -> redux
  const { status, errorMessage } = useAppSelector( state => state.auth );

  // Function to handle the form submission
  const onSubmit = handleSubmit(({ displayName, email, password }: RegisterForm) => {
    dispatch( startRegisterUserWithEmailPassword({ email, password, displayName}) );
  });

  // Memo to check if the user is checking the authentication
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <div className="w-full max-w-md mx-auto">
          
          {/* Full Name Field */}
          <div className="mb-4">
            <input
              {...register('displayName', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                }
              })}
              type="text"
              placeholder="Nombre completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Ingrese un correo válido',
                },
              })}
              type="email"
              placeholder="correo@google.com"
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
                required: 'Este campo es requerido',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              type="password"
              placeholder="Contraseña"
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

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-zinc-800 text-white rounded-sm hover:bg-zinc-900 focus:outline-none transition-colors"
              disabled={ isCheckingAuthentication }
            >
              Crear cuenta
            </button>
          </div>

          {/* Login Link */}
          <div className="text-right">
            <span className="text-gray-600 mr-2">¿Ya tienes cuenta?</span>
            <Link
              to="/auth/login"
              className="text-gray-600 hover:underline"
            >
              Ingresar
            </Link>
          </div>

        </div>
      </form>
    </AuthLayout>
  );
};
