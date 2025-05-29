import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductFormData, ProductValidationErrors, Category } from '../types/Product';
import { validateProduct, hasErrors } from '../utils/validation';
import { useProductActions } from '../hooks/useProductActions';

interface ProductFormProps {
    product?: Product | null;
    onClose: () => void;
}

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

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
    const { createProduct, updateProduct } = useProductActions();
    const isEditing = !!product;

    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        price: '',
        image: '',
        category: '',
    });

    const [errors, setErrors] = useState<ProductValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Preencher formulário quando estiver editando
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                image: product.image,
                category: product.category,
            });
            setImagePreview(product.image);
        }
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpar erro do campo quando o usuário começar a digitar
        if (errors[name as keyof ProductValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        // Preview da imagem - resetar se campo estiver vazio
        if (name === 'image') {
            if (value.trim()) {
                setImagePreview(value);
            } else {
                setImagePreview(null);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar formulário
        const validationErrors = validateProduct(formData);

        if (hasErrors(validationErrors)) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simular delay de processamento
            await new Promise(resolve => setTimeout(resolve, 500));

            if (isEditing && product) {
                updateProduct(product.id, formData);
            } else {
                createProduct(formData);
            }

            onClose();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageError = () => {
        setImagePreview(null);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Cabeçalho */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {isEditing ? 'Editar Produto' : 'Novo Produto'}
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label="Fechar formulário"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Lado esquerdo - Campos do formulário */}
                            <div className="space-y-4">
                                {/* Nome do produto */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nome do produto *
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Digite o nome do produto"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            id="name-error"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                            role="alert"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Preço */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Preço (R$) *
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className={`input-field ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="0.00"
                                        aria-invalid={!!errors.price}
                                        aria-describedby={errors.price ? 'price-error' : undefined}
                                    />
                                    {errors.price && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            id="price-error"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                            role="alert"
                                        >
                                            {errors.price}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        aria-invalid={!!errors.category}
                                        aria-describedby={errors.category ? 'category-error' : undefined}
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            id="category-error"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                            role="alert"
                                        >
                                            {errors.category}
                                        </motion.p>
                                    )}
                                </div>

                                {/* URL da imagem */}
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        URL da imagem *
                                    </label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className={`input-field ${errors.image ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        aria-invalid={!!errors.image}
                                        aria-describedby={errors.image ? 'image-error' : undefined}
                                    />
                                    {errors.image && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            id="image-error"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                            role="alert"
                                        >
                                            {errors.image}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Lado direito - Preview da imagem */}
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Preview da imagem
                                </label>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center min-h-[200px]">
                                    {imagePreview ? (
                                        <motion.img
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            src={imagePreview}
                                            alt="Preview do produto"
                                            className="max-w-full max-h-full object-contain rounded-lg"
                                            onError={handleImageError}
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400 dark:text-gray-500">
                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm">Insira uma URL válida para ver o preview</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={onClose}
                                className="flex-1 btn-secondary"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex-1 btn-primary relative"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {isEditing ? 'Atualizar Produto' : 'Criar Produto'}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductForm; 