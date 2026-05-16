/* Puxar um único produto específico para compra*/
import { produto } from './produtos.js';


export default function renderProductSelected(data) {
    const urlParams = new URLSearchParams(window.location.search);
    //const productId = urlParams.get('id');
    const productName = urlParams.get('name').split('-').join(' '); // Substitui hífens por espaços
    const selectedProduct = data.find(p =>  p.nome === productName);
    
    if (selectedProduct) {
        const productDetails = document.querySelector('.container-product');
        productDetails.innerHTML = `
        <div class="product-details">
            <div class="product-details__image">
                <img src="${selectedProduct.imagem}" alt="${selectedProduct.nome}">
                <button id="btn-add" class="btn-add">Adicionar</button>
            </div>
            <div class="product-details__info">
                <div class="product-details__info-content">
                    <h2>${selectedProduct.nome}</h2>
                    <p class="product-price"><span class="fa fa-money"></span>${selectedProduct.preco.toFixed(2)}Kz</p>
                    <p class="product-description">${selectedProduct.descricao}</p>
                </div>
                <button id="btn-check" class="btn-check"><span class="fa fa-shopping-cart"></span> Fazer pedido</button>
            </div>
        </div>
        `;
        const btnCheck = document.querySelector('#btn-check');
        console.log(btnCheck);
        btnCheck.addEventListener('click', () => {
            console.log('Botão de compra clicado');
            const popup = document.querySelector('.popup');
            document.querySelector('.popup-content').classList.toggle('zoom-in', 'zoom-out');
            popup.style.display = 'flex';    
        });

        document.querySelector('#btn-cancel').addEventListener('click', () => {
            const popup = document.querySelector('.popup');
            popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
        });

    } else {
        console.log("Produto não encontrado.");
    }
}

produto.then(data => {
    renderProductSelected(data);
}).catch(error => {
    console.error('Error rendering product:', error);
});