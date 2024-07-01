import React, { useState } from 'react';
import { useAuth } from '../contexts/authProvider.tsx';
import useCreatePost from '../hooks/userCreatePost.tsx';
import { toast } from 'react-toastify';
import { ErrorFilter } from '../shared/errorfilter.ts';
import useCreateImage from '../hooks/useCreateImage.tsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface PostFormProps {
  addNewPost: (post: any) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addNewPost }) => {
  const [title, setTitle] = useState('');
  const [imgContents, setImgContents] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const { isLoading, sendPost } = useCreatePost();
  const { getURL, sendImage } = useCreateImage();
  const { isAuthenticated, user } = useAuth();
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast.info('Necessário login');
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error('O comentário/título não pode estar vazio.');
      return;
    }

    try {
      let contentWithImage = { title, message: description, images: [] };
      if (imgContents.length > 0) {
        for (let imgContent of imgContents) {
          const imgName = imgContent.name;
          const type = imgContent.type;
          const urlResponse = await getURL(imgName, type);
          const url = urlResponse.data.signedUrl;
          const fileLink = urlResponse.data.fileLink;
          await sendImage(url, imgContent);
          contentWithImage.images.push({ sort: contentWithImage.images.length + 1, extension: type, path: fileLink });
        }
      }
      const response = await sendPost(user.userId, user.userName, contentWithImage);
      const newPost = response.response.forumPost;
      addNewPost(newPost);
      setDescription('');
      setTitle('');
      setImgContents([]);
      toast.success('Post adicionado!', { autoClose: 1000 });
    } catch (error) {
      const filteredError = ErrorFilter.shapingResponse(error.response.status);
      toast.error('Erro ao adicionar post: ' + filteredError);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImgContents(Array.from(event.target.files));
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files) {
      setImgContents(Array.from(event.dataTransfer.files));
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:mx-32 lg:mx-32">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <textarea
          className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          placeholder="Escreva uma descrição..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div
        className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded ${dragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label htmlFor="imageUpload" className="bg-blue-500 hover:bg-blue-700 text-white text-xxs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer flex items-center">
          <FontAwesomeIcon icon={faFile} className="mr-2" />
          Selecionar
        </label>
        <p className="mt-2 text-gray-600 text-xxs">Selecione ou arraste e solte os arquivos aqui</p>
        <input
          type="file"
          id="imageUpload"
          name="image"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {imgContents.length > 0 && (
        <ul className="mt-2 text-gray-600">
          {imgContents.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-xxs text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Postar
        </button>
      </div>
    </motion.form>
  );
};

export default PostForm;
