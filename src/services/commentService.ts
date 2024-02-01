import axios from 'axios';
import { storage } from '../utils/storage.ts';

const API_URL = 'https://api-typescript-express.onrender.com';

export const createComment = async (
  postId: string | null,
  userId: string | null,
  userName:string | null,
  message: string
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await axios.post(
    `${API_URL}/forumpost/${postId}/comments`,
    { userId, userName, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteComment = async (commentId:string | null, forumPostId:string | null,): Promise<any>  => {
  const token = storage.getItem('accessToken');
  console.log("service delete comment",commentId)
  const response = await axios.delete(
    `${API_URL}/comments/${forumPostId}/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
