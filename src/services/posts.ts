import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_BEARER_TOKEN = process.env.REACT_APP_API_BEARER_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_BEARER_TOKEN}`,
  },
});

const getPosts = async (page = 1, limit = 4) => {
  try {
    const response = await api.get(`/forumpost?page=${page}&limit=${limit}`);
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
