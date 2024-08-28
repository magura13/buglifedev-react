import axios from 'axios';

const API_URL = 'https://api-typescript-express.onrender.com';

// const API_URL = 'https://buglifedevbackend.azurewebsites.net';

const API_BEARER_TOKEN = '2b187843-2bd7-4160-8d4f-83034c3ab2c3';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_BEARER_TOKEN}`,
  },
});

const getPosts = async (offset, limit) => {
  try {
    const response = await api.get(
      `/forumpost?offset=${offset}&limit=${limit}`
    );
    if (!response.data) {
      throw new Error('Nenhum dado retornado');
    }
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export { getPosts };
