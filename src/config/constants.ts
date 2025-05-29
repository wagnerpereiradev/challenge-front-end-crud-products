// Configurações da aplicação
export const APP_CONFIG = {
    name: 'CRUD Produtos',
    version: '1.0.0',
    itemsPerPage: 10,
    maxPrice: 10000,
    minPrice: 0,
} as const;

// Chaves do localStorage
export const STORAGE_KEYS = {
    products: 'crud-produtos-data',
    theme: 'crud-produtos-theme',
} as const;

// Configurações de validação
export const VALIDATION_RULES = {
    name: {
        minLength: 2,
        maxLength: 100,
    },
    price: {
        min: 0.01,
        max: 999999.99,
    },
} as const;

// URLs de exemplo para imagens
export const EXAMPLE_IMAGE_URLS = [
    'https://picsum.photos/300/300?random=1',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
] as const; 