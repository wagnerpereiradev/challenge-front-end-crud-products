import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePagination } from '../hooks/usePagination';
import { useProducts } from '../context/ProductContext';

const Pagination: React.FC = () => {
    const {
        paginationInfo,
        goToPage,
        goToFirstPage,
        goToPreviousPage,
        goToNextPage,
        goToLastPage,
        canGoPrevious,
        canGoNext,
    } = usePagination();

    const { dispatch } = useProducts();
    const { currentPage, totalPages, totalItems, itemsPerPage } = paginationInfo;

    const [showJumpInput, setShowJumpInput] = useState(false);
    const [jumpPage, setJumpPage] = useState('');
    const [showItemsSelector, setShowItemsSelector] = useState(false);
    const jumpInputRef = useRef<HTMLInputElement>(null);

    const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];

    // Auto-focus no input quando abrir
    useEffect(() => {
        if (showJumpInput && jumpInputRef.current) {
            jumpInputRef.current.focus();
        }
    }, [showJumpInput]);

    // Fechar dropdowns ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showItemsSelector) {
                setShowItemsSelector(false);
            }
        };

        if (showItemsSelector) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showItemsSelector]);

    if (totalPages <= 1 && totalItems <= itemsPerPageOptions[0]) {
        return null;
    }

    // Calcular páginas visíveis com lógica melhorada
    const getVisiblePages = (): number[] => {
        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handleJumpToPage = () => {
        const page = parseInt(jumpPage);
        if (page >= 1 && page <= totalPages) {
            goToPage(page);
            setShowJumpInput(false);
            setJumpPage('');
        }
    };

    const handleJumpInputKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleJumpToPage();
        } else if (e.key === 'Escape') {
            setShowJumpInput(false);
            setJumpPage('');
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        // Calcular nova página para manter contexto
        const currentFirstItem = (currentPage - 1) * itemsPerPage + 1;
        const newPage = Math.ceil(currentFirstItem / newItemsPerPage);

        dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: newItemsPerPage });
        dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
        setShowItemsSelector(false);
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } },
        disabled: { scale: 1, opacity: 0.5 }
    };

    const pageNumberVariants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.9,
            transition: { duration: 0.1 }
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
            {/* Header com informações e controles */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6">
                {/* Informações da paginação */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Mostrando <span className="font-semibold text-primary-600 dark:text-primary-400">{startItem}</span> até{' '}
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{endItem}</span> de{' '}
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{totalItems}</span> produtos
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Página <span className="font-semibold">{currentPage}</span> de{' '}
                        <span className="font-semibold">{totalPages}</span>
                    </div>
                </div>

                {/* Controles avançados */}
                <div className="flex items-center space-x-3">
                    {/* Seletor de itens por página */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowItemsSelector(!showItemsSelector);
                            }}
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                            <span>{itemsPerPage} itens</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>

                        <AnimatePresence>
                            {showItemsSelector && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-10 min-w-[120px]"
                                >
                                    {itemsPerPageOptions.map((option) => (
                                        <motion.button
                                            key={option}
                                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                            onClick={() => handleItemsPerPageChange(option)}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${option === itemsPerPage
                                                ? 'text-primary-600 dark:text-primary-400 font-medium'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                                                }`}
                                        >
                                            {option} itens por página
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input para pular para página */}
                    <AnimatePresence>
                        {showJumpInput ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    ref={jumpInputRef}
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={jumpPage}
                                    onChange={(e) => setJumpPage(e.target.value)}
                                    onKeyDown={handleJumpInputKeyPress}
                                    placeholder={`1-${totalPages}`}
                                    className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleJumpToPage}
                                    className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                    aria-label="Ir para página"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setShowJumpInput(false);
                                        setJumpPage('');
                                    }}
                                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    aria-label="Cancelar"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowJumpInput(true)}
                                className="flex items-center space-x-1 px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors text-sm"
                                aria-label="Pular para página"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="hidden sm:inline">Pular</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controles de navegação */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-2">
                    {/* Controles mobile simplificados */}
                    <div className="flex sm:hidden items-center space-x-2">
                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoPrevious ? "hover" : "disabled"}
                            whileTap={canGoPrevious ? "tap" : "disabled"}
                            onClick={goToPreviousPage}
                            disabled={!canGoPrevious}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${canGoPrevious
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Anterior</span>
                        </motion.button>

                        <div className="px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium">
                            {currentPage} de {totalPages}
                        </div>

                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoNext ? "hover" : "disabled"}
                            whileTap={canGoNext ? "tap" : "disabled"}
                            onClick={goToNextPage}
                            disabled={!canGoNext}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${canGoNext
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                        >
                            <span>Próxima</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Controles desktop completos */}
                    <div className="hidden sm:flex items-center space-x-1">
                        {/* Primeira página */}
                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoPrevious ? "hover" : "disabled"}
                            whileTap={canGoPrevious ? "tap" : "disabled"}
                            onClick={goToFirstPage}
                            disabled={!canGoPrevious}
                            className={`p-2 rounded-lg transition-colors ${canGoPrevious
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                            title="Primeira página"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Página anterior */}
                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoPrevious ? "hover" : "disabled"}
                            whileTap={canGoPrevious ? "tap" : "disabled"}
                            onClick={goToPreviousPage}
                            disabled={!canGoPrevious}
                            className={`p-2 rounded-lg transition-colors ${canGoPrevious
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                            title="Página anterior"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Indicador de páginas ocultas à esquerda */}
                        {visiblePages[0] > 1 && (
                            <>
                                <motion.button
                                    variants={pageNumberVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => goToPage(1)}
                                    className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    1
                                </motion.button>
                                {visiblePages[0] > 2 && (
                                    <span className="px-2 text-gray-400 dark:text-gray-500">...</span>
                                )}
                            </>
                        )}

                        {/* Números das páginas */}
                        <div className="flex space-x-1">
                            {visiblePages.map((page) => (
                                <motion.button
                                    key={page}
                                    variants={pageNumberVariants}
                                    whileHover={page !== currentPage ? "hover" : undefined}
                                    whileTap={page !== currentPage ? "tap" : undefined}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${page === currentPage
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                    aria-label={`Ir para página ${page}`}
                                    aria-current={page === currentPage ? 'page' : undefined}
                                >
                                    {page}
                                </motion.button>
                            ))}
                        </div>

                        {/* Indicador de páginas ocultas à direita */}
                        {visiblePages[visiblePages.length - 1] < totalPages && (
                            <>
                                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                    <span className="px-2 text-gray-400 dark:text-gray-500">...</span>
                                )}
                                <motion.button
                                    variants={pageNumberVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => goToPage(totalPages)}
                                    className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {totalPages}
                                </motion.button>
                            </>
                        )}

                        {/* Próxima página */}
                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoNext ? "hover" : "disabled"}
                            whileTap={canGoNext ? "tap" : "disabled"}
                            onClick={goToNextPage}
                            disabled={!canGoNext}
                            className={`p-2 rounded-lg transition-colors ${canGoNext
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                            title="Próxima página"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>

                        {/* Última página */}
                        <motion.button
                            variants={buttonVariants}
                            whileHover={canGoNext ? "hover" : "disabled"}
                            whileTap={canGoNext ? "tap" : "disabled"}
                            onClick={goToLastPage}
                            disabled={!canGoNext}
                            className={`p-2 rounded-lg transition-colors ${canGoNext
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                }`}
                            title="Última página"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Pagination; 