import React, { useState } from 'react';
import useRegister from '../hooks/useRegister.tsx';
import { toast } from 'react-toastify';

const SignUpForm = ({ onClose }) => {
  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const { performRegister, loading, error } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await performRegister(credentials);
      toast.success('Cadastro bem-sucedido!', {
        onClose: () => {
          onClose();
        },
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Erro ao registrar: ' + error.message, { autoClose: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className='flex-col flex items-start'>
        <label
          htmlFor="userName"
          className="block text-sm text-gray-700"
        >
          Nome de usuário
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          required
          placeholder="Seu nome de usuário"
          value={credentials.userName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-0.5 text-sm"
        />
      </div>
      <div className='flex-col flex items-start'>
        <label
          htmlFor="email"
          className="block text-sm text-gray-700"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Seu e-mail"
          value={credentials.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-0.5 text-sm"
        />
      </div>
      <div className='flex-col flex items-start'>
        <label
          htmlFor="password"
          className="block text-sm text-gray-700"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Sua senha"
          value={credentials.password}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-0.5 text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default SignUpForm;
