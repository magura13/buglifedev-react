import axios from 'axios';

const API_URL = 'https://api-typescript-express.onrender.com'
const API_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTlhODNkY2Q3N2NkZTIxNDA5ODc5N2MiLCJpYXQiOjE3MDYyMDc1MzEsImV4cCI6MTcwNjI5MzkzMX0.AOA5fiwZUgVKH5KH0I1PRwFZS6XvvJi2kGos4yHYDbA';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_BEARER_TOKEN}`,
  },
});

const getPosts = async (offset, limit) => {
  try {
    const response = await api.get(`/forumpost?offset=${offset}&limit=${limit}`);
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
