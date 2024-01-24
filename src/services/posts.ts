import axios from 'axios';

const API_URL = 'https://api-typescript-express.onrender.com'
const API_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTlhODNkY2Q3N2NkZTIxNDA5ODc5N2MiLCJpYXQiOjE3MDYxMTMyNzksImV4cCI6MTcwNjE5OTY3OX0.G9COMNTiryEW_hoVMykgD4rw8eexjkzTJJrHK252Jy0';

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
