import { produto } from "./produtos.js";

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

const hideButton = document.querySelectorAll("#hideButton");
hideButton.forEach((bt, indice) => {
  bt.addEventListener("click", () => {
    let hideInputsRadio = document.querySelectorAll(".select-input")[indice];
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
  areaProduto.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].categoria === categoria || data[i].keyword === categoria) {
      areaProduto.innerHTML += `
            <div class="produto slide-in" data-id="${data[i].id}" data-name="${data[i].nome}">
            
                <div class="produto__imagem">
                    <img src="${data[i].imagem}" alt="${data[i].nome}">
                </div>

                <div class="product--info">
                    <div class="">
                        <h4>${data[i].nome}</h4>
                        <span class="pricetag">${data[i].preco.toFixed(2)}Kz</span>
                    </div>
                
                    <div class="lovebox">
                        <span class="fas fa-heart like ${data[i].liked ? "liked" : ""}"></span>
                    </div>
                </div>

            </div>`;
      return;
    }
  }
  // Tela de produto não encontrado (UI page not found)
  areaProduto.innerHTML = `
            <div class="item--not--found slide-in">
                <div class="produto__imagem" style="background: transparent;">
                    <img src="assets/images/undraw_empty_4zx0.svg" alt="Produto não encontrado">
                    
                </div>
                <div class="description">
                    <h2>Produto não encontrado</h2>
                    <p>Desculpe, o produto que você está procurando não está disponível.</p>
                </div>
                <button>Pesquisar novamente</button>
            </div>`;

  const caixaCurti = document.querySelectorAll(".lovebox");
  caixaCurti.forEach(function (box) {
    box.addEventListener("click", function () {
      const likeIcon = this.querySelector(".like");
      likeIcon.classList.toggle("liked");
    });
  });
}

const radio = document.querySelectorAll("#categoriaa");
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
    window.location.href = `/produto?name=${produtoElement.dataset.name}`;
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id === "filterButton") {
    const filterButton = document.getElementById("filterButton");
    const sideBar = document.querySelector(".sideBar");
    sideBar.style.left = sideBar.style.left === "0px" ? "-100%" : "0px";
    console.log("clicou");
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
