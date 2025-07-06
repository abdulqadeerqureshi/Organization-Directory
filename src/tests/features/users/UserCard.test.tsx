import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '../../../features/users/UserCard';
import { User } from '../../../features/users/users.types';

const mockUser: User = {
  id: '1',
  username: 'johndoe',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'Software Engineer',
  join_date: '5/4/2023',
  description: 'Experienced software engineer with a passion for frontend development.',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const onViewMore = vi.fn();
    render(<UserCard user={mockUser} onViewMore={onViewMore} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('View More')).toBeInTheDocument();
  });

  it('calls onViewMore when View More button is clicked', () => {
    const onViewMore = vi.fn();
    render(<UserCard user={mockUser} onViewMore={onViewMore} />);
    
    fireEvent.click(screen.getByText('View More'));
    expect(onViewMore).toHaveBeenCalledTimes(1);
  });

  it('renders user avatar', () => {
    const onViewMore = vi.fn();
    render(<UserCard user={mockUser} onViewMore={onViewMore} />);
    
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});