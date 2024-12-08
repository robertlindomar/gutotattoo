document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Função para filtrar os itens
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category').toLowerCase();
            
            if (category === 'todos' || itemCategory === category.toLowerCase()) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Adicionar evento de clique aos botões
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-[#B8860B]', 'text-black');
                btn.classList.add('bg-neutral-800', 'text-gray-300');
            });

            // Adiciona classe ativa ao botão clicado
            button.classList.remove('bg-neutral-800', 'text-gray-300');
            button.classList.add('bg-[#B8860B]', 'text-black');

            // Filtra os itens
            const category = button.getAttribute('data-filter');
            filterPortfolio(category);
        });
    });
}); 