'use client';

import { login } from '@/app/auth/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <form action={dispatch} className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <LoginButton />
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">{errorMessage}</p>
      )}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${pending ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
} 