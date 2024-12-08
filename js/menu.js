// Configuração do Portfólio
const portfolioConfig = {
    selectors: {
        filterButtons: '#portfolio .flex-wrap button',
        portfolioItems: '#portfolio .grid > div',
        categoryLabel: '.text-amber-400'
    },
    classes: {
        active: {
            add: ['bg-amber-600', 'text-black'],
            remove: ['bg-neutral-800', 'text-gray-300']
        },
        inactive: {
            add: ['bg-neutral-800', 'text-gray-300'],
            remove: ['bg-amber-600', 'text-black']
        }
    }
};

// Funções de Animação
const animations = {
    showItem: (item) => {
        item.style.opacity = '1';
        item.style.display = 'block';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 50);
    },

    hideItem: (item) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
            item.style.display = 'none';
        }, 300);
    }
};

// Gerenciador de Filtros
class PortfolioFilter {
    constructor(config) {
        this.config = config;
        this.buttons = document.querySelectorAll(config.selectors.filterButtons);
        this.items = document.querySelectorAll(config.selectors.portfolioItems);
    }

    updateButtonStyles(activeButton) {
        this.buttons.forEach(btn => {
            btn.classList.remove(...this.config.classes.active.add);
            btn.classList.add(...this.config.classes.inactive.add);
        });

        activeButton.classList.remove(...this.config.classes.inactive.add);
        activeButton.classList.add(...this.config.classes.active.add);
    }

    filterItems(category) {
        this.items.forEach(item => {
            const itemCategory = item.querySelector(this.config.selectors.categoryLabel)
                .textContent.trim().toLowerCase();

            if (category === 'todos' || itemCategory === category) {
                animations.showItem(item);
            } else {
                animations.hideItem(item);
            }
        });
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.textContent.trim().toLowerCase();
                this.updateButtonStyles(button);
                this.filterItems(category);
            });
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    const portfolioFilter = new PortfolioFilter(portfolioConfig);
    portfolioFilter.init();
});

// Funções do Modal
function abrirModal(elemento) {
    const modal = document.getElementById('modal-detalhes');

    // Preencher informações do modal
    document.getElementById('modal-imagem').src = elemento.dataset.imagem;
    document.getElementById('modal-imagem').alt = elemento.dataset.titulo;
    document.getElementById('modal-categoria').textContent = elemento.dataset.categoria;
    document.getElementById('modal-titulo').textContent = elemento.dataset.titulo;
    document.getElementById('modal-descricao').textContent = elemento.dataset.descricao;
    document.getElementById('modal-tempo').textContent = elemento.dataset.tempo;
    document.getElementById('modal-estilo').textContent = elemento.dataset.estilo;
    document.getElementById('modal-artista').textContent = elemento.dataset.artista;

    // Exibir modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.getElementById('modal-detalhes');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
document.getElementById('modal-detalhes').addEventListener('click', function (e) {
    if (e.target === this) {
        fecharModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        fecharModal();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Elementos do menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('i');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    // Estado do menu
    let isMenuOpen = false;

    // Função para abrir/fechar o menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        // Atualiza classes e aria-expanded
        mobileMenu.classList.toggle('hidden', !isMenuOpen);
        mobileMenuButton.setAttribute('aria-expanded', isMenuOpen);

        // Alterna o ícone do menu
        menuIcon.classList.toggle('fa-bars', !isMenuOpen);
        menuIcon.classList.toggle('fa-times', isMenuOpen);

        // Adiciona/remove classes de animação
        if (isMenuOpen) {
            mobileMenu.classList.add('menu-open');
            mobileMenu.classList.remove('menu-close');
        } else {
            mobileMenu.classList.add('menu-close');
            mobileMenu.classList.remove('menu-open');
        }
    }

    // Event listener para o botão do menu
    mobileMenuButton.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Fecha o menu ao redimensionar a janela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);

        if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuButton) {
            toggleMenu();
        }
    });
});