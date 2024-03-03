import axios from 'axios';
import { storage } from '../utils/storage.ts';
import {LikeData} from '../types/LikeData.ts'

// const API_URL = 'https://api-typescript-express.onrender.com';

const API_URL = 'http://localhost:3001'

export const createLike = async (
    LikeData:LikeData
): Promise<Response> => {
  const token = storage.getItem('accessToken');
  const response = await axios.post(
    `${API_URL}/like/${LikeData.forumPostId}/${LikeData.userId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.response;
};

export const deleteLike = async (
    LikeData:LikeData
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await axios.delete(
    `${API_URL}/like/${LikeData.forumPostId}/${LikeData.userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
