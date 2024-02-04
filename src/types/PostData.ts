export interface PostData {
  content: {
    title: string;
    subject: string;
    message: string;
    images: string[];
  };
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  __v: number;
  comments: CommentData[];
}

export interface CommentData {
  isActive: boolean;
  userId: string;
  message: string;
  _id: string;
}
