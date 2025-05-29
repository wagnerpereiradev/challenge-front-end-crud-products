import { defaultProducts } from '../data/mockProducts';

const STORAGE_KEY = 'crud-produtos-data';

export const seedLocalStorage = (): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        console.log(`✅ LocalStorage populado com ${defaultProducts.length} produtos!`);
    } catch (error) {
        console.error('❌ Erro ao popular localStorage:', error);
    }
};

export const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('crud-produtos-theme');
        console.log('✅ LocalStorage limpo!');
    } catch (error) {
        console.error('❌ Erro ao limpar localStorage:', error);
    }
};

// Se executado diretamente no browser console
if (typeof window !== 'undefined') {
    (window as any).seedProducts = seedLocalStorage;
    (window as any).clearProducts = clearLocalStorage;
    console.log('🌱 Comandos disponíveis:');
    console.log('- seedProducts(): popular localStorage com dados mockados');
    console.log('- clearProducts(): limpar localStorage');
} 