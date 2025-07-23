import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {isLogin ? 'Login to Your Account' : 'Create an Account'}
      </h1>

      {isLogin ? <LoginForm /> : <SignupForm />}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-600 underline"
      >
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  );
}

export default LoginPage;