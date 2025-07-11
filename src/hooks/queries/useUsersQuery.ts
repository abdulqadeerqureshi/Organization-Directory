import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../lib/api';
import { User } from '../../features/users/users.types';

export const USERS_QUERY_KEY = ['users'] as const;

export const useUsersQuery = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersApi.getUsers,
    select: (data: User[]) => {
      // Optional: Transform or sort data here
      return data.sort((a, b) => a.firstname.localeCompare(b.firstname));
    },
    meta: {
      errorMessage: 'Failed to load users. Please try again.',
    },
  });
};

// Hook for getting a specific user by ID (derived from users query)
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, userId],
    queryFn: async () => {
      const users = await usersApi.getUsers();
      const user = users.find(u => u.id === userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return user;
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // User details can be cached longer
  });
};