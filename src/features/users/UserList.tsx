import React, { useState, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { UserCard } from './UserCard';
import { UserDetailsSidebar } from './UserDetailsSidebar';
import { UserFilters } from './UserFilters';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useUsers } from './useUsers';
import { usePagination } from '../../hooks/usePagination';
import { USERS_QUERY_KEY } from '../../hooks/queries/useUsersQuery';
import { User } from './users.types';

const ITEMS_PER_PAGE = 10;

export const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const { users, loading, error, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm === '' || 
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = selectedRole === '' || user.role === selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedUsers,
    goToPage,
    resetPagination,
  } = usePagination({
    data: filteredUsers,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchTerm, selectedRole, resetPagination]);
  
  const handleViewMore = (user: User) => {
    setSelectedUser(user);
    setIsSidebarOpen(true);
  };
  
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedUser(null);
  };

  const handleRefresh = () => {
    // Invalidate and refetch users query
    queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRole('');
  };

  const handlePageChange = (page: number) => {
    goToPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={handleRefresh}
      />
    );
  }
  
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No users found.</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      <UserFilters
        users={users}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
      />
      
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No users match your current filters.</p>
          <button
            onClick={handleClearFilters}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {paginatedUsers.length} of {filteredUsers.length} users
              {filteredUsers.length !== users.length && ` (${users.length} total)`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onViewMore={() => handleViewMore(user)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}
      
      <UserDetailsSidebar
        user={selectedUser}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </>
  );
};