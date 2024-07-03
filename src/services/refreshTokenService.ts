import axios from 'axios';

export const apiInstance = axios.create({
    // baseURL: 'https://api-typescript-express.onrender.com',
    // baseURL: "https://buglifedevbackend.azurewebsites.net",

    baseURL: 'http://localhost:3001',
    withCredentials: true,
});

async function refreshAccessToken() {
   const response =  await apiInstance.patch(`/user/refresh`);
   const {token} = response.data
   localStorage.setItem('accessToken',token)
}

apiInstance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  });

apiInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAccessToken();
                return apiInstance(originalRequest);
            } catch (refreshError) {

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiInstance