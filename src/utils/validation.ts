import { ProductFormData, ProductValidationErrors } from '../types/Product';

export const validateProduct = (data: ProductFormData): ProductValidationErrors => {
    const errors: ProductValidationErrors = {};

    // Validação do nome
    if (!data.name.trim()) {
        errors.name = 'Nome é obrigatório';
    } else if (data.name.trim().length < 2) {
        errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação do preço
    if (!data.price.trim()) {
        errors.price = 'Preço é obrigatório';
    } else {
        const price = parseFloat(data.price);
        if (isNaN(price) || price <= 0) {
            errors.price = 'Preço deve ser um número maior que zero';
        }
    }

    // Validação da imagem (URL)
    if (!data.image.trim()) {
        errors.image = 'URL da imagem é obrigatória';
    } else if (!isValidUrl(data.image)) {
        errors.image = 'URL da imagem deve ser válida';
    }

    // Validação da categoria
    if (!data.category.trim()) {
        errors.category = 'Categoria é obrigatória';
    }

    return errors;
};

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const hasErrors = (errors: ProductValidationErrors): boolean => {
    return Object.keys(errors).length > 0;
}; 