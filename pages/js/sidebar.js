document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

document.addEventListener("DOMContentLoaded", () => {
    const sideItems = document.querySelectorAll(".side-item a");

    sideItems.forEach((item, index) => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Impede que o link recarregue a página imediatamente

            // Remove a classe 'active' de todos os itens
            document.querySelectorAll(".side-item").forEach(i => i.classList.remove("active"));

            // Adiciona a classe 'active' ao item clicado
            this.parentElement.classList.add("active");

            // Salva no localStorage
            localStorage.setItem("activeMenuItem", index);

            // Aguarda um curto tempo antes de mudar de página para garantir a atualização da classe
            setTimeout(() => {
                window.location.href = this.href; // Redireciona corretamente
            }, 100);
        });
    });

    // Recupera o item ativo salvo no localStorage
    const activeIndex = localStorage.getItem("activeMenuItem");
    if (activeIndex !== null) {
        document.querySelectorAll(".side-item")[activeIndex].classList.add("active");
    }
});

