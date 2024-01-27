import React, { useState } from 'react';
import useLogin from '../hooks/useLogin.tsx';
import { toast } from 'react-toastify';

const LoginForm = ({ onClose }) => {
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
        });
      } 
    } catch (error) {
      toast.error(error.message || "Ocorreu um erro inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
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
