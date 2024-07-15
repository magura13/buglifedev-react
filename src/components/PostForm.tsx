import React, { useState } from 'react';
import { useAuth } from '../contexts/authProvider.tsx';
import useCreatePost from '../hooks/userCreatePost.tsx';
import { toast } from 'react-toastify';
import { ErrorFilter } from '../shared/errorfilter.ts';
import useCreateImage from '../hooks/useCreateImage.tsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PostFormProps {
  addNewPost: (post: any) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addNewPost }) => {
  const [title, setTitle] = useState('');
  const [imgContent, setImgContent] = useState<File | null>(null);
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
      if (imgContent) {
        const imgName = imgContent.name;
        const type = imgContent.type;
        const urlResponse = await getURL(imgName, type);
        const url = urlResponse.data.signedUrl;
        const fileLink = urlResponse.data.fileLink;
        await sendImage(url, imgContent);
        contentWithImage.images.push({ sort: 1, extension: type, path: fileLink });
      }
      const response = await sendPost(user.userId, user.userName, contentWithImage);
      const newPost = response.response.forumPost;
      addNewPost(newPost);
      setDescription('');
      setTitle('');
      setImgContent(null);
      toast.success('Post adicionado!', { autoClose: 1000 });
    } catch (error) {
      const filteredError = ErrorFilter.shapingResponse(error.response.status);
      toast.error('Erro ao adicionar post: ' + filteredError);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 1) {
      toast.error('Você só pode adicionar um arquivo por vez.');
      return;
    }
    setImgContent(event.target.files ? event.target.files[0] : null);
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragleave' || event.type === 'dragover') {
      setDragActive(event.type === 'dragenter' || event.type === 'dragover');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 1) {
      toast.error('Você só pode adicionar um arquivo por vez.');
      return;
    }
    setImgContent(event.dataTransfer.files ? event.dataTransfer.files[0] : null);
  };

  const handleRemoveFile = () => {
    setImgContent(null);
    toast.info('Arquivo removido.');
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:mx-32 lg:mx-32"
    >
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
        <p className="mt-2 text-gray-600 text-xxs">Selecione ou arraste e solte um arquivo aqui (Apenas um arquivo por post)</p>
        <input
          type="file"
          id="imageUpload"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {imgContent && (
        <div className="mt-2 text-gray-600 flex items-center">
          <span>{imgContent.name}</span>
          <button
            type="button"
            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            onClick={handleRemoveFile}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
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
