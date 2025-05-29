import { useProducts } from '../context/ProductContext';
import { Product, ProductFormData } from '../types/Product';

export const useProductActions = () => {
    const { state, dispatch } = useProducts();

    const createProduct = (formData: ProductFormData): void => {
        const newProduct: Product = {
            id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            image: formData.image.trim(),
            category: formData.category as any,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    };

    const updateProduct = (productId: string, formData: ProductFormData): void => {
        // Encontrar o produto existente para preservar a data de criação
        const existingProduct = state.products.find(p => p.id === productId);

        const updatedProduct: Product = {
            id: productId,
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            image: formData.image.trim(),
            category: formData.category as any,
            createdAt: existingProduct?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
    };

    const deleteProduct = (productId: string): void => {
        dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    };

    const setSelectedProduct = (product: Product | null): void => {
        dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    };

    const resetData = (): void => {
        dispatch({ type: 'RESET_DATA' });
    };

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        setSelectedProduct,
        resetData,
    };
}; 