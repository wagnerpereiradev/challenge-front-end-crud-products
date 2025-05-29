import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';

interface HeaderProps {
    onToggleSidebar: () => void;
    onResetFilters?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onResetFilters }) => {
    const { state, dispatch } = useProducts();

    const toggleDarkMode = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    };

    const resetData = () => {
        if (window.confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
            dispatch({ type: 'RESET_DATA' });
        }
    };

    const goToHome = () => {
        // Resetar todos os filtros
        dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
        dispatch({ type: 'CLEAR_CATEGORIES' });
        dispatch({ type: 'SET_PRICE_RANGE', payload: { min: 0, max: 10000 } });
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });

        // Callback opcional para fechar sidebar no mobile
        if (onResetFilters) {
            onResetFilters();
        }
    };

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo, título e botão mobile */}
                    <div className="flex items-center">
                        {/* Botão menu mobile */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 mr-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            aria-label="Abrir filtros"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={goToHome}
                            className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
                            aria-label="Ir ao início e limpar filtros"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3"
                            >
                                <span className="text-white font-bold text-lg">P</span>
                            </motion.div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                CRUD Produtos
                            </h1>
                        </motion.button>
                    </div>

                    {/* Controles */}
                    <div className="flex items-center space-x-4">
                        {/* Botão Reset */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetData}
                            className="hidden sm:block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            aria-label="Resetar dados"
                        >
                            Resetar Dados
                        </motion.button>

                        {/* Toggle Dark Mode */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                         hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label={state.isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                        >
                            {state.isDarkMode ? (
                                // Ícone Sol
                                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                </svg>
                            ) : (
                                // Ícone Lua
                                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header; 