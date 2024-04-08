
import { storage } from '../utils/storage.ts';
import apiInstance from './refreshTokenService.ts';


export const createComment = async (
  postId: string | null,
  userId: string | null  | undefined,
  userName: string | null,
  message: string
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await apiInstance.post(
    `/forumpost/${postId}/comments`,
    { userId, userName, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.response;
};

export const deleteComment = async (
  commentId: string | null,
  forumPostId: string | null
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await apiInstance.delete(
    `/comments/${forumPostId}/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
