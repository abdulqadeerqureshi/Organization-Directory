import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserFilters } from '../../../features/users/UserFilters';
import { User } from '../../../features/users/users.types';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar1.jpg',
    role: 'Software Engineer',
    join_date: '5/4/2023',
    description: 'Experienced software engineer.',
  },
  {
    id: '2',
    username: 'janesmith',
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar2.jpg',
    role: 'Product Manager',
    join_date: '8/20/2022',
    description: 'Strategic product manager.',
  },
];

describe('UserFilters', () => {
  it('renders search input and role filter', () => {
    render(
      <UserFilters
        users={mockUsers}
        searchTerm=""
        onSearchChange={() => {}}
        selectedRole=""
        onRoleChange={() => {}}
      />
    );
    
    expect(screen.getByPlaceholderText('Search by name or username...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Roles')).toBeInTheDocument();
  });

  it('shows active filters', () => {
    render(
      <UserFilters
        users={mockUsers}
        searchTerm="john"
        onSearchChange={() => {}}
        selectedRole="Software Engineer"
        onRoleChange={() => {}}
      />
    );
    
    expect(screen.getByText('Search: "john"')).toBeInTheDocument();
    expect(screen.getByText('Role: Software Engineer')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = vi.fn();
    render(
      <UserFilters
        users={mockUsers}
        searchTerm=""
        onSearchChange={onSearchChange}
        selectedRole=""
        onRoleChange={() => {}}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search by name or username...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(onSearchChange).toHaveBeenCalledWith('test');
  });
});