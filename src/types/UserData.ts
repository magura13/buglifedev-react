export interface UserCredentials {
  email: string;
  password: string;
  userName: string;
}

export interface UserResponse {
  response: {
    default: string;
    user: {
      userName: string;
      password: string; //remove from backend
      email: string;
      openToWork: boolean;
      workAt: string[];
      _id: string;
      programmingLanguages: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
