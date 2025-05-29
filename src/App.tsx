import React, { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useProducts } from './context/ProductContext';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

// Componente interno que usa o contexto
const AppContent: React.FC = () => {
  const { state } = useProducts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hook para scroll automático quando mudar de página
  useScrollToTop({ currentPage: state.currentPage, delay: 200 });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResetFilters = () => {
    // Fechar sidebar no mobile quando resetar filtros
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header onToggleSidebar={toggleSidebar} onResetFilters={handleResetFilters} />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar de filtros */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <SearchAndFilters
            isSidebarOpen={true}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* Sidebar mobile */}
        <div className="lg:hidden">
          <SearchAndFilters
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductList />
            <div className="mt-8">
              <Pagination />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ProductProvider>
      <AppContent />
    </ProductProvider>
  );
}

export default App;
