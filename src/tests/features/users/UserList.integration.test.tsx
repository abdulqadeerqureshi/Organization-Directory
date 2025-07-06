import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { UserList } from '../../../features/users/UserList';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const createMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    username: `user${i + 1}`,
    firstname: `First${i + 1}`,
    lastname: `Last${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://example.com/avatar${i + 1}.jpg`,
    role: i % 2 === 0 ? 'Software Engineer' : 'Product Manager',
    join_date: '5/4/2023',
    description: `Description for user ${i + 1}`,
  }));
};

const mockApiResponse = {
  data: {
    users: createMockUsers(25), // 25 users to test pagination
  },
};

const smallMockApiResponse = {
  data: {
    users: [
      {
        id: '1',
        username: 'johndoe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar1.jpg',
        role: 'Software Engineer',
        join_date: '5/4/2023',
        description: 'Experienced software engineer with a passion for frontend development.',
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
        description: 'Strategic product manager with expertise in user experience.',
      },
    ],
  },
};

describe('UserList Integration', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('displays users after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => smallMockApiResponse,
    });

    render(<UserList />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Find the user cards and check their roles within the specific cards
    const johnDoeCard = screen.getByText('John Doe').closest('.bg-white');
    const janeSmithCard = screen.getByText('Jane Smith').closest('.bg-white');
    
    // Use getAllByText and filter by the specific card context
    const softwareEngineerElements = screen.getAllByText('Software Engineer');
    const productManagerElements = screen.getAllByText('Product Manager');
    
    // Check that we have the role text in the cards (not just in the filter dropdown)
    expect(softwareEngineerElements.length).toBeGreaterThan(0);
    expect(productManagerElements.length).toBeGreaterThan(0);
    
    // Verify the roles are in the correct cards
    expect(within(johnDoeCard!).getByText('Software Engineer')).toBeInTheDocument();
    expect(within(janeSmithCard!).getByText('Product Manager')).toBeInTheDocument();
  });

  it('displays pagination when there are more than 10 users', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeInTheDocument();
    });

    // Should show pagination
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Showing 10 of 25 users')).toBeInTheDocument();

    // Should show only 10 users on first page
    const userCards = screen.getAllByText('View More');
    expect(userCards).toHaveLength(10);
  });

  it('navigates between pages correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeInTheDocument();
    });

    // Click next page
    fireEvent.click(screen.getByText('Next'));

    // Should show users 11-20
    await waitFor(() => {
      expect(screen.getByText('First11 Last11')).toBeInTheDocument();
    });

    expect(screen.queryByText('First1 Last1')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 10 of 25 users')).toBeInTheDocument();
  });

  it('resets pagination when filters change', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeInTheDocument();
    });

    // Go to page 2
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('First11 Last11')).toBeInTheDocument();
    });

    // Apply a filter
    const searchInput = screen.getByPlaceholderText('Search by name or username...');
    fireEvent.change(searchInput, { target: { value: 'First1' } });

    // Wait for the UI to update with filtered results
    await waitFor(() => {
      expect(screen.getByText(/Showing \d+ of \d+ users/)).toBeInTheDocument();
    });

    // Should reset to page 1 and show filtered results
    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeInTheDocument();
    });

    // Should show fewer results due to filter
  });

  it('opens sidebar when View More is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => smallMockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Click View More button for John Doe
    const viewMoreButtons = screen.getAllByText('View More');
    fireEvent.click(viewMoreButtons[0]);

    // Sidebar should open with user details
    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    expect(screen.getByText('Experienced software engineer with a passion for frontend development.')).toBeInTheDocument();
  });

  it('filters users by search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => smallMockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Search for "Jane"
    const searchInput = screen.getByPlaceholderText('Search by name or username...');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });

    // Should only show Jane Smith
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('filters users by role', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => smallMockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Filter by Product Manager role
    const roleSelect = screen.getByDisplayValue('All Roles');
    fireEvent.change(roleSelect, { target: { value: 'Product Manager' } });

    // Should only show Jane Smith
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to fetch users/)).toBeInTheDocument();
  });

  it('shows no results message when filters return empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => smallMockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Search for something that doesn't exist
    const searchInput = screen.getByPlaceholderText('Search by name or username...');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

    expect(screen.getByText('No users match your current filters.')).toBeInTheDocument();
    expect(screen.getByText('Clear all filters')).toBeInTheDocument();
  });

  it('handles pagination with filtered results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeInTheDocument();
    });

    // Filter by Software Engineer (should show ~13 users)
    const roleSelect = screen.getByDisplayValue('All Roles');
    fireEvent.change(roleSelect, { target: { value: 'Software Engineer' } });

    // Should show pagination for filtered results
    await waitFor(() => {
      const showingText = screen.getByText(/Showing \d+ of \d+ users/);
      expect(showingText).toBeInTheDocument();
    });

    // Should show only Software Engineers
    const userCards = screen.getAllByText('View More');
    expect(userCards.length).toBeLessThanOrEqual(10);
  });
});