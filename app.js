// Elementos do DOM
const wrapper = document.querySelector(".product-wrapper");
const menuItems = document.querySelectorAll(".menu-item");
const buyButtons = document.querySelectorAll(".buy-button");
const closeButtons = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal-copo-açai, .modal-pote-acai, .modal-sorvete");
const indicators = document.querySelectorAll(".indicator");

// Dados dos produtos (expandido para incluir modal correspondente)
const products = [
    {
        id: 1,
        title: "Copo de Açaí",
        price: 10.00,
        modalClass: ".modal-copo-açai" // Classe do modal específico
    },
    {
        id: 2,
        title: "Pote de Açaí",
        price: 20.00,
        modalClass: ".modal-pote-acai"
    },
    {
        id: 3,
        title: "Sorvete",
        price: 9.90,
        modalClass: ".modal-sorvete"
    }
];

let currentIndex = 0; // Índice do produto atual no carrossel

// Função para atualizar o carrossel
function updateCarousel(index) {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    currentIndex = index;
}

// Evento para abrir modal ao clicar em "Compre Agora"
buyButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(products[index].modalClass);
        if (modal) {
            modal.classList.remove("hidden");
            modal.setAttribute("aria-hidden", "false");
            modal.focus(); // Foco no modal para acessibilidade
        }
    });
});

// Função para fechar modal
function closeModal(modal) {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
}

// Evento para fechar modal com botão "X"
closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".modal-copo-açai, .modal-pote-acai, .modal-sorvete");
        closeModal(modal);
    });
});

// Fechar modal ao clicar fora ou pressionar ESC
modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) { // Clique no fundo
            closeModal(modal);
        }
    });

    modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal(modal);
        }
    });
});

// Inicialização: definir indicador ativo
updateCarousel(0);

// Elementos das setas
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Função para navegar para o produto anterior
function prevProduct() {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
    updateCarousel(newIndex);
}

// Função para navegar para o próximo produto
function nextProduct() {
    const newIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;
    updateCarousel(newIndex);
}

// Eventos para as setas
prevBtn.addEventListener("click", prevProduct);
nextBtn.addEventListener("click", nextProduct);

// Opcional: Navegação por teclado (setas esquerda/direita)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        prevProduct();
    } else if (e.key === "ArrowRight") {
        nextProduct();
    }
});