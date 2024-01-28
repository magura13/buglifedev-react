import axios from 'axios';

const API_URL = 'https://api-typescript-express.onrender.com';
const API_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTlhODNkY2Q3N2NkZTIxNDA5ODc5N2MiLCJpYXQiOjE3MDY0NDE5NzYsImV4cCI6MTcwNjUyODM3Nn0.wCHLKpoxO3x9-6GjAsWickD_ezRgp7rfTcSsYLWY5ks';

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
