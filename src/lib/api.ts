import axios from 'axios';
import { User, ApiResponse } from '../features/users/users.types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging or auth tokens
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<ApiResponse>('/users');
      
      if (!response.data?.data?.users || !Array.isArray(response.data.data.users)) {
        throw new Error('Invalid API response format');
      }
      
      return response.data.data.users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch users: ${error.response?.status} ${error.response?.statusText || error.message}`);
      }
      throw error;
    }
  },
};

export default api;