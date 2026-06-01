import { produto } from "./produtos.js";


body.onload = function () {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 8000);
}


const areaProduto = document.querySelector(".area__produtos");

const renderProdutos = (lista) => {
  areaProduto.innerHTML = lista
    .map(
      (p) => `
        <div class="produto slide-in" data-id="${p.id}" data-name="${p.nome.split(" ").join("-")}">
            
            <div class="produto__imagem">
                <img src="${p.imagem}" alt="${p.nome}">
            </div>

            <div class="product--info">
                <div class="">
                    <h4>${p.nome}</h4>
                    <span class="pricetag">${p.preco.toFixed(2)}Kz</span>
                </div>
                
                <div>
                    <div class="lovebox">
                        <span class="fas fa-heart like "></span>
                    </div>
                    <div class="cart--shopp">
                        <i class="fa fa-cart-shopping" style="color: grey;"></i>    
                    </div>
                </div>
                
            </div>
            
        </div>
    `,
    )
    .join("");

  const caixaCurti = document.querySelectorAll(".lovebox");
  caixaCurti.forEach(function (box) {
    box.addEventListener("click", function () {
      const likeIcon = this.querySelector(".like");
      likeIcon.classList.toggle("liked");
    });
  });
};

produto.then((data) => {
  renderProdutos(data);
});

const hideButton = document.querySelectorAll(".categoria--titulos .fa-minus");
hideButton.forEach((bt, indice) => {
  bt.addEventListener("click", () => {
    let hideInputsRadio = document.querySelectorAll(".select-input")[indice];
    
    if (indice === 2) {
      let colorGrid = document.querySelector('#color-grid')
      colorGrid.style.display = colorGrid.style.display === "none" ? "grid" : "none";
    } else if (indice === 3) {
      let priceGrid = document.querySelector('#price-grid')
      priceGrid.style.display = priceGrid.style.display === "none" ? "grid" : "none";
    }

    hideInputsRadio.classList.toggle("hide");

    if (bt.classList == "fa fa-minus") {
      bt.classList.remove("fa-minus");
      bt.classList.add("fa-plus");
    } else {
      bt.classList.remove("fa-plus");
      bt.classList.add("fa-minus");
    }
  });
}); 



/* Filtrar produtos por categoria */

function filtrarProdutos(data, categoria) {
  const produtosFiltrados = data.filter(
    (item) => item.categoria === categoria || item.keyword === categoria,
  );

  if (produtosFiltrados.length === 0) {
    areaProduto.innerHTML = `
      <div class="produto-vazio">
        <div class="imagem-vazia" 
          style="width: 300px; 
          height: 300px; 
          margin-bottom: 20px;">
          <img src="assets/images/undraw_empty_4zx0.svg" alt="Nenhum produto encontrado" style="width: 100%; height: 100%;">
        </div>
        <p>Nenhum produto encontrado para a categoria "${categoria}".</p>
      </div>
    `;
    return;
  }

  areaProduto.innerHTML = produtosFiltrados
    .map(
      (p) => `
      <div class="produto slide-in" data-id="${p.id}" data-name="${p.nome}">
        <div class="produto__imagem">
          <img src="${p.imagem}" alt="${p.nome}">
        </div>

        <div class="product--info">
          <div class="">
            <h4>${p.nome}</h4>
            <span class="pricetag">${p.preco.toFixed(2)}Kz</span>
          </div>

          <div class="lovebox">
            <span class="fas fa-heart like ${p.liked ? "liked" : ""}"></span>
          </div>
        </div>
      </div>`,
    )
    .join("");

  const caixaCurti = document.querySelectorAll(".lovebox");
  caixaCurti.forEach(function (box) {
    box.addEventListener("click", function () {
      const likeIcon = this.querySelector(".like");
      likeIcon.classList.toggle("liked");
    });
  });
}

const radio = document.querySelectorAll("#filterSection input[type='radio']");
radio.forEach((r) => {
  r.addEventListener("click", () => {
    if (r.value == "Todos") {
      produto.then((data) => {
        renderProdutos(data);
      });
    } else {
      //Renderizar apenas os produtos com a categoria selecionada
      produto.then((data) => {
        filtrarProdutos(data, r.value);
      });
    }
  });
});

areaProduto.addEventListener("click", (event) => {
  const produtoElement = event.target.closest(".produto");
  if (produtoElement) {
    // Handle product click event
    window.location.href = `/produto?name=${produtoElement.dataset.name}&id=${produtoElement.dataset.id}`;
  }
  else if (event.target.classList.contains("fa-cart-shopping")) {
    const produtoElement = event.target.closest(".produto");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id === "filterButton") {
    const filterButton = document.getElementById("filterButton");
    const sideBar = document.querySelector(".sideBar");
    sideBar.style.left = sideBar.style.left === "0px" ? "-100%" : "0px";
    //Se o evento for fora, fecha a barra lateral
    document.addEventListener("click", (event) => {
      if (
        !sideBar.contains(event.target) &&
        event.target.id !== "filterButton"
      ) {
        sideBar.style.left = "-100%";
      }
    });
  }
});

