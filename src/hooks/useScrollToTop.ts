import { useEffect } from 'react';

interface UseScrollToTopProps {
    currentPage: number;
    behavior?: ScrollBehavior;
    delay?: number;
}

export const useScrollToTop = ({
    currentPage,
    behavior = 'smooth',
    delay = 200
}: UseScrollToTopProps) => {
    useEffect(() => {
        const scrollToTop = () => {
            // Scroll para o topo da página principal (body)
            window.scrollTo({
                top: 0,
                behavior
            });

            // Também scroll para o topo do container principal se existir
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.scrollTo({
                    top: 0,
                    behavior
                });
            }
        };

        // Delay para aguardar a animação dos cards (AnimatePresence com popLayout)
        const timeoutId = setTimeout(scrollToTop, delay);

        return () => clearTimeout(timeoutId);
    }, [currentPage, behavior, delay]);
}; 