export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductFormData {
    name: string;
    price: string;
    image: string;
    category: Category | '';
}

export interface ProductValidationErrors {
    name?: string;
    price?: string;
    image?: string;
    category?: string;
}

export type Category =
    | 'Eletrônicos'
    | 'Roupas'
    | 'Livros'
    | 'Casa e Jardim'
    | 'Esportes'
    | 'Beleza'
    | 'Automóveis'
    | 'Brinquedos'
    | 'Alimentação'
    | 'Saúde';

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
} 