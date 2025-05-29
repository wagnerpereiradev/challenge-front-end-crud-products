import { Product, Category } from '../types/Product';

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

const productNames = [
    // Eletrônicos
    'Smartphone iPhone 15', 'Notebook Dell Inspiron', 'Tablet Samsung Galaxy', 'Fone Bluetooth Sony', 'Smart TV 55"',
    'Console PlayStation 5', 'Câmera Canon DSLR', 'Smartwatch Apple', 'Kindle Paperwhite', 'Caixa de Som JBL',

    // Roupas
    'Camiseta Polo', 'Jeans Skinny', 'Vestido Floral', 'Blazer Social', 'Tênis Nike Air',
    'Camisa Social', 'Saia Midi', 'Calça Moletom', 'Casaco Inverno', 'Sandália Couro',

    // Livros
    'Dom Casmurro', 'O Alquimista', 'Código Limpo', 'Harry Potter', 'Game of Thrones',
    'O Pequeno Príncipe', 'Sapiens', 'Yuval Harari', 'Clean Architecture', 'Python Fluente',

    // Casa e Jardim
    'Aspirador Robô', 'Conjunto Panelas', 'Plantas Ornamentais', 'Luminária LED', 'Tapete Persa',
    'Cadeira Gamer', 'Mesa de Jantar', 'Guarda-roupa', 'Geladeira Frost Free', 'Micro-ondas',

    // Esportes
    'Bicicleta Mountain Bike', 'Esteira Elétrica', 'Halteres 20kg', 'Tênis Corrida', 'Prancha Surf',
    'Bola Futebol', 'Raquete Tênis', 'Kit Yoga', 'Luvas Boxe', 'Patins Inline',

    // Beleza
    'Base Líquida', 'Perfume Importado', 'Shampoo Profissional', 'Batom Matte', 'Protetor Solar',
    'Máscara Facial', 'Sérum Vitamina C', 'Esmalte Gel', 'Paleta Sombras', 'Hidratante Corporal',

    // Automóveis
    'Pneu Aro 15', 'Óleo Motor', 'Bateria Automotiva', 'GPS Automotivo', 'Capa Banco',
    'Alarme Veicular', 'Som Automotivo', 'Película Vidro', 'Tapete Automotivo', 'Ferramenta Kit',

    // Brinquedos
    'Boneca Barbie', 'Carrinho Hot Wheels', 'Lego Creator', 'Pelúcia Urso', 'Quebra-cabeça',
    'Bicicleta Infantil', 'Jogo Tabuleiro', 'Massinha Play-Doh', 'Boneco Action Figure', 'Kit Pintura',

    // Alimentação
    'Café Gourmet', 'Chocolate Belga', 'Azeite Extra Virgem', 'Mel Orgânico', 'Vinho Tinto',
    'Biscoito Premium', 'Chá Verde', 'Granola Artesanal', 'Açúcar Mascavo', 'Pasta Amendoim',

    // Saúde
    'Vitamina D', 'Whey Protein', 'Multivitamínico', 'Ômega 3', 'Colágeno',
    'Termômetro Digital', 'Kit Primeiros Socorros', 'Máscara Cirúrgica', 'Álcool Gel', 'Proteína Vegana'
];

const generateImageUrl = (index: number): string => {
    // URLs de imagens placeholder mais realistas
    const imageUrls = [
        'https://picsum.photos/300/300?random=',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center',
    ];

    return `${imageUrls[index % imageUrls.length]}${index}`;
};

const generatePrice = (): number => {
    return Math.floor(Math.random() * 2000) + 10; // Preços entre R$ 10 e R$ 2010
};

export const generateMockProducts = (): Product[] => {
    const products: Product[] = [];

    for (let i = 0; i < productNames.length; i++) {
        const product: Product = {
            id: `product-${i + 1}`,
            name: productNames[i],
            price: generatePrice(),
            image: generateImageUrl(i),
            category: categories[Math.floor(i / 10) % categories.length],
            createdAt: new Date(Date.now() - Math.random() * 10000000000),
            updatedAt: new Date()
        };

        products.push(product);
    }

    return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const defaultProducts = generateMockProducts(); 