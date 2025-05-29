import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types/Product';
import { useProductActions } from '../hooks/useProductActions';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
    const { deleteProduct } = useProductActions();
    const [imageError, setImageError] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleDelete = () => {
        deleteProduct(product.id);
        setShowDeleteConfirm(false);
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="card overflow-hidden"
        >
            {/* Imagem do produto */}
            <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
                {!imageError ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Badge da categoria */}
                <div className="absolute top-2 left-2">
                    <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Conteúdo do cartão */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <div className="mb-3">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(product.price)}
                    </span>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <p>Criado em: {formatDate(product.createdAt)}</p>
                    {product.updatedAt !== product.createdAt && (
                        <p>Atualizado em: {formatDate(product.updatedAt)}</p>
                    )}
                </div>

                {/* Botões de ação */}
                <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onEdit(product)}
                        className="flex-1 btn-primary text-sm py-2"
                        aria-label={`Editar produto ${product.name}`}
                    >
                        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDeleteConfirm(true)}
                        className="btn-danger text-sm py-2 px-3"
                        aria-label={`Excluir produto ${product.name}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Modal de confirmação de exclusão */}
            {showDeleteConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Confirmar exclusão
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tem certeza que deseja excluir o produto "{product.name}"? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex space-x-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 btn-secondary"
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDelete}
                                className="flex-1 btn-danger"
                            >
                                Excluir
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProductCard; 