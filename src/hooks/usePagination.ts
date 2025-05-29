import { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { PaginationInfo } from '../types/Product';

export const usePagination = () => {
    const { state, dispatch } = useProducts();
    const { filteredProducts, currentPage, itemsPerPage } = state;

    const paginationInfo: PaginationInfo = useMemo(() => {
        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
        };
    }, [filteredProducts.length, currentPage, itemsPerPage]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const goToPage = (page: number): void => {
        if (page >= 1 && page <= paginationInfo.totalPages) {
            dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        }
    };

    const goToFirstPage = (): void => {
        goToPage(1);
    };

    const goToPreviousPage = (): void => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = (): void => {
        goToPage(currentPage + 1);
    };

    const goToLastPage = (): void => {
        goToPage(paginationInfo.totalPages);
    };

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < paginationInfo.totalPages;

    return {
        paginatedProducts,
        paginationInfo,
        goToPage,
        goToFirstPage,
        goToPreviousPage,
        goToNextPage,
        goToLastPage,
        canGoPrevious,
        canGoNext,
    };
}; 