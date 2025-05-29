import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, Category } from '../types/Product';
import { defaultProducts } from '../data/mockProducts';

// Estados da aplicação
interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    currentPage: number;
    itemsPerPage: number;
    isLoading: boolean;
    selectedProduct: Product | null;
    searchTerm: string;
    selectedCategory: Category[];
    minPrice: number;
    maxPrice: number;
    isDarkMode: boolean;
}

// Ações disponíveis
type ProductAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'ADD_PRODUCT'; payload: Product }
    | { type: 'UPDATE_PRODUCT'; payload: Product }
    | { type: 'DELETE_PRODUCT'; payload: string }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
    | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_SELECTED_CATEGORY'; payload: Category[] }
    | { type: 'TOGGLE_CATEGORY'; payload: Category }
    | { type: 'CLEAR_CATEGORIES' }
    | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
    | { type: 'FILTER_PRODUCTS' }
    | { type: 'TOGGLE_DARK_MODE' }
    | { type: 'RESET_DATA' };

// Estado inicial
const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    currentPage: 1,
    itemsPerPage: 10,
    isLoading: false,
    selectedProduct: null,
    searchTerm: '',
    selectedCategory: [],
    minPrice: 0,
    maxPrice: 10000,
    isDarkMode: false,
};

// Chave para localStorage
const STORAGE_KEY = 'crud-produtos-data';
const THEME_KEY = 'crud-produtos-theme';

// Reducer para gerenciar as ações
const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
            };

        case 'ADD_PRODUCT':
            const newProducts = [action.payload, ...state.products];
            return {
                ...state,
                products: newProducts,
                filteredProducts: newProducts
            };

        case 'UPDATE_PRODUCT':
            const updatedProducts = state.products.map(product =>
                product.id === action.payload.id ? action.payload : product
            );
            return {
                ...state,
                products: updatedProducts,
                filteredProducts: updatedProducts
            };

        case 'DELETE_PRODUCT':
            const filteredProducts = state.products.filter(
                product => product.id !== action.payload
            );
            return {
                ...state,
                products: filteredProducts,
                filteredProducts
            };

        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };

        case 'SET_ITEMS_PER_PAGE':
            return { ...state, itemsPerPage: action.payload };

        case 'SET_SELECTED_PRODUCT':
            return { ...state, selectedProduct: action.payload };

        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload, currentPage: 1 };

        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };

        case 'TOGGLE_CATEGORY':
            const category = action.payload;
            const newSelectedCategory = state.selectedCategory.includes(category)
                ? state.selectedCategory.filter(c => c !== category)
                : [...state.selectedCategory, category];
            return {
                ...state,
                selectedCategory: newSelectedCategory,
                currentPage: 1
            };

        case 'CLEAR_CATEGORIES':
            return {
                ...state,
                selectedCategory: [],
                currentPage: 1
            };

        case 'SET_PRICE_RANGE':
            return {
                ...state,
                minPrice: action.payload.min,
                maxPrice: action.payload.max,
                currentPage: 1
            };

        case 'FILTER_PRODUCTS':
            let filtered = state.products;

            // Filtro por termo de busca
            if (state.searchTerm) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            }

            // Filtro por categoria
            if (state.selectedCategory.length > 0) {
                filtered = filtered.filter(product =>
                    state.selectedCategory.includes(product.category)
                );
            }

            // Filtro por faixa de preço
            filtered = filtered.filter(product =>
                product.price >= state.minPrice && product.price <= state.maxPrice
            );

            return {
                ...state,
                filteredProducts: filtered,
                currentPage: 1
            };

        case 'TOGGLE_DARK_MODE':
            return { ...state, isDarkMode: !state.isDarkMode };

        case 'RESET_DATA':
            return {
                ...state,
                products: defaultProducts,
                filteredProducts: defaultProducts,
                currentPage: 1,
                searchTerm: '',
                selectedCategory: [],
                minPrice: 0,
                maxPrice: 10000
            };

        default:
            return state;
    }
};

// Context
const ProductContext = createContext<{
    state: ProductState;
    dispatch: React.Dispatch<ProductAction>;
} | null>(null);

// Provider component
interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    // Carregar tema do localStorage na inicialização (antes de qualquer outro processamento)
    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark') {
            dispatch({ type: 'TOGGLE_DARK_MODE' });
        }
    }, []);

    // Carregar dados do localStorage na inicialização
    useEffect(() => {
        const loadData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });

            try {
                const savedData = localStorage.getItem(STORAGE_KEY);

                // Simular delay de carregamento
                await new Promise(resolve => setTimeout(resolve, 500));

                if (savedData) {
                    const products = JSON.parse(savedData);
                    // Converter strings de data de volta para objetos Date
                    const productsWithDates = products.map((product: any) => ({
                        ...product,
                        createdAt: new Date(product.createdAt),
                        updatedAt: new Date(product.updatedAt)
                    }));
                    dispatch({ type: 'SET_PRODUCTS', payload: productsWithDates });
                } else {
                    dispatch({ type: 'SET_PRODUCTS', payload: defaultProducts });
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                dispatch({ type: 'SET_PRODUCTS', payload: defaultProducts });
            }

            dispatch({ type: 'SET_LOADING', payload: false });
        };

        loadData();
    }, []);

    // Salvar dados no localStorage sempre que os produtos mudarem
    useEffect(() => {
        if (state.products.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
        }
    }, [state.products]);

    // Gerenciar tema: aplicar no DOM e salvar no localStorage
    useEffect(() => {
        // Aplicar tema no DOM
        if (state.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Salvar tema no localStorage
        localStorage.setItem(THEME_KEY, state.isDarkMode ? 'dark' : 'light');
    }, [state.isDarkMode]);

    // Aplicar filtros sempre que os critérios mudarem
    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCTS' });
    }, [state.searchTerm, state.selectedCategory, state.minPrice, state.maxPrice, state.products]);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts deve ser usado dentro de um ProductProvider');
    }
    return context;
}; 