import { useState, useEffect, useCallback } from 'react';
import { User, ApiResponse } from './users.types';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const API_ENDPOINT = 'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users';

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }
      
      const apiData: ApiResponse = await response.json();
      
      if (!apiData.data || !apiData.data.users || !Array.isArray(apiData.data.users)) {
        throw new Error('Invalid API response format');
      }
      
      setUsers(apiData.data.users);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};