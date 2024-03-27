import React, { useEffect,useContext, useState } from 'react';
import { useAuth } from '../contexts/authProvider.tsx';
import useCreatePost from '../hooks/userCreatePost.tsx'
import { toast } from 'react-toastify';
import { storage } from '../utils/storage.ts';
import { ErrorFilter } from '../shared/errorfilter.ts'

import useCreateImage from '../hooks/useCreateImage.tsx';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [imgContent, setImgContent] = useState('');
  const [description, setDescription] = useState('');
  const { isLoading, sendPost } = useCreatePost();
  const { getURL, sendImage } = useCreateImage();
  const {isAuthenticated,user} = useAuth()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast.info('Necessário login')
      return
    }

    if (!title.trim() || !description.trim()) {
      toast.error('O comentário/título não pode estar vazio.');
      return;
    }
    try {

      // enviando imagem
      if (imgContent) {

        const imgName = imgContent.name
        const type = imgContent.type
        const urlResponse = await getURL(imgName, type)
        const url = urlResponse.data.signedUrl
        const fileLink = urlResponse.data.fileLink
        const respImage = await sendImage(url, imgContent)
        const contentWithImage = { title: title, message: description, images: [{ sort: 1, extension: type, path: fileLink }] };
        await sendPost(user.userId, user.userName, contentWithImage);

      } else {
        const contentWithoutImage = { title: title, message: description };
        await sendPost(user.userId, user.userName, contentWithoutImage);
      }
      setDescription('');
      setTitle('');
      toast.success('Post adicionado!', { autoClose: 1000 });
    } catch (error) {
        const filteredError = ErrorFilter.shapingResponse(error.response.status);
        toast.error('Erro ao adicionar post: ' + filteredError);
    }
  };

  const handleFileChange = (event) => {
    setImgContent(event.target.files[0]);
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
        <input
          type="file" id="imageUpload" name="image" accept="image/*" onChange={handleFileChange}
        >
        </input>
      </div>
    </form>
  );
};

export default TaskForm;
