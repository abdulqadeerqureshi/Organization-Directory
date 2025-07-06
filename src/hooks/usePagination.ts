import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPagination: () => void;
}

export const usePagination = <T>({
  data,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Ensure current page is valid when data changes
  const validCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return Math.min(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, validCurrentPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [validCurrentPage, totalPages]);

  const previousPage = useCallback(() => {
    if (validCurrentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [validCurrentPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage: validCurrentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    resetPagination,
  };
};