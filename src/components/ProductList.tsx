import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { usePagination } from '../hooks/usePagination';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import LoadingSpinner from './LoadingSpinner';

const ProductList: React.FC = () => {
    const { state } = useProducts();
    const { paginatedProducts } = usePagination();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    if (state.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Carregando produtos...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho com botão adicionar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Produtos
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {state.filteredProducts.length === 0
                            ? 'Nenhum produto encontrado'
                            : `${state.filteredProducts.length} produto${state.filteredProducts.length !== 1 ? 's' : ''} encontrado${state.filteredProducts.length !== 1 ? 's' : ''}`
                        }
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddProduct}
                    className="btn-primary inline-flex items-center"
                    aria-label="Adicionar novo produto"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Adicionar Produto
                </motion.button>
            </div>

            {/* Lista de produtos */}
            {state.filteredProducts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Nenhum produto encontrado
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {state.searchTerm || state.selectedCategory || state.minPrice > 0 || state.maxPrice < 10000
                            ? 'Tente ajustar os filtros para encontrar produtos.'
                            : 'Comece adicionando seu primeiro produto.'}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddProduct}
                        className="btn-primary"
                    >
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Adicionar Primeiro Produto
                    </motion.button>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEditProduct}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Formulário de produto */}
            <AnimatePresence>
                {showForm && (
                    <ProductForm
                        product={editingProduct}
                        onClose={handleCloseForm}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductList; 