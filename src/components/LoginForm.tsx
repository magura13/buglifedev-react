import React, { useState } from 'react';
import useLogin from '../hooks/useLogin.tsx';
import { toast } from 'react-toastify';

const LoginForm = ({ onClose ,onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { performLogin, loading, error } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await performLogin(email, password);
      if (result && result.accessToken) {
        toast.success('Login bem-sucedido!', {
          onClose: () => {
            onClose();
          },
          autoClose: 2000,
        });
        onLoginSuccess()
      }
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro inesperado.', {
        autoClose: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit } className="space-y-4  ">
      <div className='flex-col flex items-start'>
        <label 
        htmlFor="email"
        className="block text-sm text-gray-700"
        >Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          placeholder='Seu e-mail'
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-0.5 text-sm"
        />
      </div>
      <div className='flex-col flex items-start'>
        <label 
        htmlFor="email"
        className="block text-sm text-gray-700">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          placeholder='Sua senha'
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-0.5 text-sm"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={loading}
      >
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
