import { renderHook, waitFor } from '@testing-library/react';
import { useUsers } from '../../../features/users/useUsers';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock console.error to prevent error logs in tests
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

const mockApiResponse = {
  data: {
    users: [
      {
        id: '1',
        username: 'johndoe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
        role: 'Software Engineer',
        join_date: '5/4/2023',
        description: 'Experienced software engineer.',
      },
    ],
  },
};

describe('useUsers', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('fetches users successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockApiResponse.data.users);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toContain('Failed to fetch users');
    
    // Verify console.error was called but don't fail the test
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('handles network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe('Network error');
    
    // Verify console.error was called but don't fail the test
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('can refetch data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockApiResponse.data.users);

    // Mock a new response for refetch
    const newMockResponse = {
      data: {
        users: [
          ...mockApiResponse.data.users,
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
        ],
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newMockResponse,
    });

    // Call refetch
    result.current.refetch();

    await waitFor(() => {
      expect(result.current.users).toEqual(newMockResponse.data.users);
    });
  });
});