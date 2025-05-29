import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { Category } from '../types/Product';

const categories: Category[] = [
    'Eletrônicos',
    'Roupas',
    'Livros',
    'Casa e Jardim',
    'Esportes',
    'Beleza',
    'Automóveis',
    'Brinquedos',
    'Alimentação',
    'Saúde'
];

interface SearchAndFiltersProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
    isSidebarOpen,
    onToggleSidebar
}) => {
    const { state, dispatch } = useProducts();
    const { searchTerm, selectedCategory, minPrice, maxPrice } = state;

    const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(selectedCategory.length > 0);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
    };

    const handleCategoryToggle = (category: Category) => {
        dispatch({ type: 'TOGGLE_CATEGORY', payload: category });
    };

    const handleClearCategories = () => {
        dispatch({ type: 'CLEAR_CATEGORIES' });
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        dispatch({ type: 'SET_PRICE_RANGE', payload: { min: value, max: maxPrice } });
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 10000;
        dispatch({ type: 'SET_PRICE_RANGE', payload: { min: minPrice, max: value } });
    };

    const clearFilters = () => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
        dispatch({ type: 'CLEAR_CATEGORIES' });
        dispatch({ type: 'SET_PRICE_RANGE', payload: { min: 0, max: 10000 } });
    };

    const hasActiveFilters = searchTerm || selectedCategory.length > 0 || minPrice > 0 || maxPrice < 10000;

    const sidebarContent = (
        <div className="h-full flex flex-col">
            {/* Cabeçalho da sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filtros
                </h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggleSidebar}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Fechar filtros"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
            </div>

            {/* Conteúdo da sidebar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Busca */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Buscar produtos
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Digite o nome..."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            aria-label="Buscar produtos por nome"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Categorias - Acordeão */}
                <div>
                    {/* Header do acordeão */}
                    <motion.button
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Categorias
                            </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            {selectedCategory.length > 0 && (
                                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs px-2 py-1 rounded-full">
                                    {selectedCategory.length}
                                </span>
                            )}
                            <motion.svg
                                animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </div>
                    </motion.button>

                    {/* Conteúdo do acordeão */}
                    <AnimatePresence>
                        {isCategoriesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="pt-2 pb-1 space-y-1">
                                    <motion.button
                                        whileHover={{ x: 2 }}
                                        onClick={handleClearCategories}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedCategory.length === 0
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <span>Todas as categorias</span>
                                        {selectedCategory.length > 0 && (
                                            <span className="text-xs opacity-75">Limpar seleção</span>
                                        )}
                                    </motion.button>
                                    {categories.map((category, index) => (
                                        <motion.button
                                            key={category}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ x: 2 }}
                                            onClick={() => handleCategoryToggle(category)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${selectedCategory.includes(category)
                                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {/* Checkbox visual */}
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedCategory.includes(category)
                                                ? 'bg-primary-600 border-primary-600'
                                                : 'border-gray-300 dark:border-gray-500'
                                                }`}>
                                                {selectedCategory.includes(category) && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span>{category}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Faixa de preço */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Faixa de preço
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="minPrice" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Preço mínimo
                            </label>
                            <input
                                id="minPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                placeholder="R$ 0,00"
                                className="input-field text-sm"
                                aria-label="Preço mínimo"
                            />
                        </div>
                        <div>
                            <label htmlFor="maxPrice" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Preço máximo
                            </label>
                            <input
                                id="maxPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                placeholder="R$ 10.000,00"
                                className="input-field text-sm"
                                aria-label="Preço máximo"
                            />
                        </div>
                    </div>
                </div>

                {/* Indicador de filtros ativos */}
                {hasActiveFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Filtros ativos
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                                {state.filteredProducts.length} resultado{state.filteredProducts.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={clearFilters}
                            className="w-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                            aria-label="Limpar todos os filtros"
                        >
                            Limpar filtros
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Overlay para mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={onToggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : '-100%'
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                }}
                className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:relative lg:transform-none lg:shadow-none lg:bg-transparent lg:dark:bg-transparent"
            >
                <div className="lg:bg-white lg:dark:bg-gray-800 lg:shadow-md h-full">
                    {sidebarContent}
                </div>
            </motion.aside>
        </>
    );
};

export default SearchAndFilters; 