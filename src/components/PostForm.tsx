import React, { useState } from 'react';
import useCreatePost from '../hooks/userCreatePost.tsx'
import { toast } from 'react-toastify';
import { storage } from '../utils/storage.ts';
import {ErrorFilter} from '../shared/errorfilter.ts'

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {isLoading,sendPost} =  useCreatePost();
  const userId = storage.getItem('userId');
  const userName = storage.getItem('userName');
  const content = {title:title,message:description};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() ) {
      toast.error('O comentário/título não pode estar vazio.');
      return;
    }
    try {
      const x = await sendPost( userId, userName, content);
      setDescription('');
      setTitle('');
      toast.success('Post adicionado!', { autoClose: 1000 });
    } catch (error) {
      const filteredError = ErrorFilter.shapingResponse(error.response.status);
      toast.error('Erro ao adicionar post: ' + filteredError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <textarea
          className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crie um Post
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
