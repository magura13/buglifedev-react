import axios from 'axios';

const API_URL = 'https://buglifedevbackend.azurewebsites.net/news';

export const getNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error;
  }
};
