import React, { useMemo } from 'react';
import { SearchInput } from '../../components/SearchInput';
import { FilterSelect } from '../../components/FilterSelect';
import { User } from './users.types';

interface UserFiltersProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  users,
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
}) => {
  const roleOptions = useMemo(() => {
    const uniqueRoles = Array.from(new Set(users.map(user => user.role)))
      .filter(Boolean)
      .sort();
    
    return uniqueRoles.map(role => ({
      value: role,
      label: role
    }));
  }, [users]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search by name or username..."
            className="w-full"
          />
        </div>
        <div className="sm:w-64">
          <FilterSelect
            value={selectedRole}
            onChange={onRoleChange}
            options={roleOptions}
            placeholder="All Roles"
            className="w-full"
          />
        </div>
      </div>
      
      {(searchTerm || selectedRole) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedRole && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Role: {selectedRole}
                <button
                  onClick={() => onRoleChange('')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};