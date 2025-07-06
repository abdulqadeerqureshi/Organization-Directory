import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../hooks/usePagination';

const mockData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

describe('usePagination', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.paginatedData[0]).toEqual({ id: 1, name: 'Item 1' });
  });

  it('navigates to specific page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.paginatedData[0]).toEqual({ id: 11, name: 'Item 11' });
  });

  it('navigates to next page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('navigates to previous page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.goToPage(2);
    });

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('handles last page with fewer items', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.paginatedData).toHaveLength(5);
    expect(result.current.paginatedData[0]).toEqual({ id: 21, name: 'Item 21' });
  });

  it('prevents navigation beyond valid page range', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.goToPage(10); // Beyond total pages
    });

    expect(result.current.currentPage).toBe(3); // Should be clamped to max page

    act(() => {
      result.current.goToPage(-1); // Below minimum
    });

    expect(result.current.currentPage).toBe(1); // Should be clamped to min page
  });

  it('resets pagination correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.resetPagination();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('recalculates when data changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) =>
        usePagination({
          data,
          itemsPerPage: 10,
        }),
      {
        initialProps: { data: mockData },
      }
    );

    expect(result.current.totalPages).toBe(3);

    const newData = mockData.slice(0, 15);
    rerender({ data: newData });

    expect(result.current.totalPages).toBe(2);
  });

  it('handles empty data array', () => {
    const { result } = renderHook(() =>
      usePagination({
        data: [],
        itemsPerPage: 10,
      })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.paginatedData).toHaveLength(0);
  });
});