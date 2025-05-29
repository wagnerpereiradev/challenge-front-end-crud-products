# CRUD de Produtos em React

Uma aplicação completa de CRUD (Create, Read, Update, Delete) para gerenciamento de produtos, desenvolvida em React com TypeScript, utilizando dados mockados e persistência no localStorage. Interface moderna com tema dark/light, filtros avançados, paginação inteligente e seleção múltipla de categorias.

## 🚀 Demo Online

**[🌐 Acesse a aplicação em produção](https://challenge-front-end-crud-products.vercel.app/)**

A aplicação está hospedada no Vercel e pode ser acessada diretamente pelo link acima. Todas as funcionalidades estão disponíveis para teste imediato!

## Stack e Pré-requisitos

### Stack Tecnológica
- **React 18+** com Hooks
- **TypeScript** (modo estrito)
- **TailwindCSS** para estilização
- **Framer Motion** para animações
- **Context API + useReducer** para gerenciamento de estado
- **localStorage** para persistência de dados

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Navegador moderno com suporte a ES6+

## Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd crud-produtos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor de desenvolvimento na porta 3000 |
| `npm run build` | Gera build otimizado para produção |
| `npm test` | Executa a suíte de testes |
| `npm run eject` | Ejeta configurações do CRA (irreversível) |

### Funcionalidades de Reset
- **Interface**: Botão "Resetar Dados" no cabeçalho
- **Logo clicável**: Clique no logo para limpar filtros e ir ao início
- **Console**: Para desenvolvimento, use `localStorage.clear()` + refresh

## Uso

### Fluxos CRUD

#### ✅ **Criar Produto**
1. Clique no botão flutuante "+" (canto inferior direito)
2. Preencha todos os campos obrigatórios:
   - Nome (mínimo 2 caracteres)
   - Preço (número > 0)
   - URL da imagem (URL válida)
   - Categoria (seleção obrigatória)
3. Visualize o preview da imagem em tempo real
4. Clique em "Criar Produto"

#### 📖 **Listar Produtos**
- Visualização em grid responsivo
- Paginação inteligente (4, 8, 12, 16, 24 ou 40 produtos por página)
- Informações exibidas: imagem quadrada, nome, preço, categoria, datas
- Controles de paginação: primeira, anterior, números, próxima, última
- Input para pular diretamente para página específica

#### ✏️ **Editar Produto**
1. Clique no botão "Editar" no cartão do produto
2. Modifique os campos desejados
3. Preview da imagem é atualizado automaticamente
4. Clique em "Atualizar Produto"

#### 🗑️ **Excluir Produto**
1. Clique no botão de exclusão (ícone lixeira)
2. Confirme a ação no modal de confirmação
3. Produto será removido permanentemente

### Filtros e Busca Avançada
- **Busca por nome**: Campo de busca com ícone e placeholder
- **Seleção múltipla de categorias**: 
  - Interface com checkboxes visuais
  - Acordeão expansível/colapsável
  - Toggle de categorias (clique para selecionar/desselecionar)
  - Contador de categorias ativas
- **Filtro por faixa de preço**: Valores mínimo e máximo
- **Indicador de filtros ativos**: Mostra quantidade de resultados
- **Limpar filtros**: Botão para resetar todos os filtros

### Atalhos e Funcionalidades Especiais
- **Logo clicável**: Clique no logo "CRUD Produtos" para resetar filtros e voltar ao início
- **Tema escuro/claro**: Toggle no cabeçalho com ícones sol/lua
- **Sidebar responsiva**: Overlay no mobile, fixa no desktop
- **Navegação por teclado**: Suporte completo com Tab e Enter
- **Animações suaves**: Transições e micro-interações
- **Estados de loading**: Indicadores visuais durante carregamento

## Estrutura de Pastas

```
src/
├── components/          # Componentes React
│   ├── Header.tsx       # Cabeçalho com logo clicável e controles
│   ├── SearchAndFilters.tsx # Busca e filtros com acordeão
│   ├── ProductList.tsx  # Lista principal de produtos
│   ├── ProductCard.tsx  # Cartão individual do produto
│   ├── ProductForm.tsx  # Modal de formulário CRUD
│   ├── Pagination.tsx   # Paginação avançada com controles
│   └── LoadingSpinner.tsx # Indicador de carregamento
├── context/             # Context API
│   └── ProductContext.tsx # Estado global e actions
├── hooks/               # Hooks customizados
│   ├── useProductActions.ts # Ações CRUD encapsuladas
│   └── usePagination.ts # Lógica de paginação avançada
├── types/               # Definições TypeScript
│   └── Product.ts       # Interfaces, tipos e categorias
├── utils/               # Utilitários
│   └── validation.ts    # Validações de formulário
├── data/                # Dados mockados
│   └── mockProducts.ts  # Produtos iniciais para seeding
├── config/              # Configurações
│   └── constants.ts     # Constantes da aplicação
└── index.css           # Estilos globais + Tailwind + componentes
```

## Arquitetura & Gerenciamento de Estado

### Context API + useReducer
- **ProductContext**: Estado global centralizado com reducer pattern
- **Actions tipadas**: SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, TOGGLE_CATEGORY, etc.
- **Reducer puro**: Lógica imutável para todas as atualizações de estado
- **Hooks customizados**: Abstração das operações CRUD e paginação

### Fluxo de Dados Unidirecional
```
Componente → Hook Customizado → Context → Reducer → Novo Estado → Re-render
```

### Persistência Inteligente
- **localStorage automático**: Estado sincronizado automaticamente
- **Recuperação de dados**: Carregamento inicial com fallback
- **Tema persistente**: Dark/light mode mantido entre sessões
- **Debounce nos filtros**: Performance otimizada

### Estado Global
```typescript
interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
  selectedCategory: Category[]; // Múltiplas categorias
  minPrice: number;
  maxPrice: number;
  isDarkMode: boolean;
  isLoading: boolean;
}
```

## Validações & Acessibilidade

### Validações de Formulário em Tempo Real
- **Nome**: Obrigatório, mínimo 2 caracteres, máximo 100
- **Preço**: Obrigatório, número positivo, até R$ 999.999,99
- **Imagem**: URL válida obrigatória com preview automático
- **Categoria**: Seleção obrigatória de categoria tipada
- **Feedback visual**: Erros mostrados instantaneamente
- **Estados de submit**: Loading e desabilitação durante processamento

### Acessibilidade WCAG 2.1 AA
- ✅ **Navegação por teclado**: Tab, Enter, Escape funcionam em todos os componentes
- ✅ **ARIA labels**: Botões, inputs e controles com labels descritivos
- ✅ **ARIA roles**: Estrutura semântica apropriada
- ✅ **Alt text**: Imagens com textos alternativos
- ✅ **Contraste**: Cores atendem padrão AA em ambos os temas
- ✅ **Focus indicators**: Anéis de foco visíveis e contrastantes
- ✅ **Screen readers**: Compatível com NVDA, JAWS e VoiceOver
- ✅ **Responsive**: Funciona em dispositivos móveis e desktop
- ✅ **Reduced motion**: Respeita preferências de animação do usuário

## Reset de Dados

### Opções de Reset Disponíveis
1. **Logo do Header**: Clique no logo "CRUD Produtos" para limpar apenas filtros
2. **Botão "Resetar Dados"**: Restaura produtos originais (com confirmação)
3. **Console/Debug**: `localStorage.clear()` + reload da página
4. **Programático**: Context action `RESET_DATA`

### Dados Padrão (Seeding)
- **Produtos**: 100+ produtos variados
- **Categorias**: 10 categorias (Eletrônicos, Roupas, Livros, Casa e Jardim, etc.)

## Padrões de Código & Commits

### Convenções de Código
- **TypeScript estrito**: `strict: true`, sem `any`, interfaces completas
- **Componentes funcionais**: Hooks apenas, sem class components
- **Props tipadas**: Interfaces dedicadas para todas as props
- **Naming consistente**: camelCase para variáveis, PascalCase para componentes
- **Imports organizados**: React → bibliotecas → componentes → tipos → utils
- **Comentários TSDoc**: Funções complexas documentadas

### Padrões de Commits Semânticos
```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
perf: melhoria de performance
test: adição ou correção de testes
chore: tarefas de manutenção
```

### Exemplo de Commits
```
feat: adicionar seleção múltipla de categorias
fix: corrigir bug na paginação com filtros ativos
docs: atualizar README com novas funcionalidades
refactor: extrair lógica de validação para hook customizado
```

## Funcionalidades Futuras / Bônus

### ✅ Implementado
- [x] TypeScript estrito com interfaces completas
- [x] Seleção múltipla de categorias com checkboxes
- [x] Filtros avançados (nome, múltiplas categorias, faixa de preço)
- [x] Tema dark/light com persistência
- [x] Animações fluidas com Framer Motion
- [x] Responsividade completa
- [x] Acessibilidade WCAG 2.1 AA
- [x] Logo clicável para reset de filtros
- [x] Imagens quadradas (aspect-ratio 1:1)
- [x] Preview de imagem em tempo real
- [x] Modal de confirmação para exclusão
- [x] Indicadores de filtros ativos
- [x] Loading states

### 🚀 Possíveis Melhorias Futuras
- [ ] Drag & drop para upload de imagens
- [ ] Bulk operations (seleção múltipla de produtos)
- [ ] Filtros por data de criação/atualização
- [ ] Export/import de dados (JSON/CSV)
- [ ] Busca avançada com múltiplos critérios
- [ ] Histórico de ações (undo/redo)
- [ ] PWA com offline support
- [ ] Testes unitários e E2E abrangentes

## Licença

Este projeto foi desenvolvido como parte de um desafio técnico e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ usando React + TypeScript + TailwindCSS + Framer Motion**
