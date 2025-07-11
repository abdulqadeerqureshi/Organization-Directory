import { useUsersQuery } from '../../hooks/queries/useUsersQuery';

export const useUsers = () => {
  const { data: users = [], isLoading: loading, error, refetch } = useUsersQuery();
  
  return {
    users,
    loading,
    error: error?.message || null,
    refetch,
  };
};