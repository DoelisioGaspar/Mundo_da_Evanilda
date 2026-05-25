const heroContent = document.querySelector(".hero-container");

heroContent.innerHTML = `

    <div class="groupButton" 
    style="position: absolute; bottom: 20px; left: 50%; 
    transform: translateX(-50%); display: flex; gap: 10px;
    z-index: 10;">
                <input type="radio" name="selectSlide" id="" checked>
                <input type="radio" name="selectSlide" id="" style="accent-color: var(--blue); background: #1234dd;">
                <input type="radio" name="selectSlide" id="">
                <input type="radio" name="selectSlide" id="">
    </div>

    <div class="slide">

        <div class="text-hero">
            <span style="color: #e4e44a; 
                     text-transform: uppercase;
                    font-weight: 600; letter-spacing: 2px;">Produtos de alta qualidade
            </span>
            <br>
            <h1 style="color: #fff; font-size: 3rem;">Em um único <br> lugar</h1>
            <button data-action="comprar">Compra já</button>
        </div>
        <div class="hero-image">
            <img src="assets/images/headphones-bluetooth.png" alt="Imagem do Hero" loading="lazy">
        </div>
    </div>

    <div class="slide">

        <div class="text-hero">
            <span style="color: #e4e44a; 
                font-size: 1.3rem; text-transform: uppercase;
                font-weight: 600; letter-spacing: 2px;">Produtos de alta qualidade
            </span>
            <br>
            <h1 style="color: #fff; font-size: 3rem;">Em um único <br> lugar</h1>
            <button data-action="comprar">Compra já</button>
        </div>
        <div class="hero-image">
            <img src="assets/images/pngwing.com copy.png" alt="Imagem do Hero" loading="lazy">
        </div>
    </div>
    
    <div class="slide">

        <div class="text-hero">
            <span style="color: #e4e44a; 
                    font-size: 1.3rem; text-transform: uppercase;
                    font-weight: 600; letter-spacing: 2px;">Produtos de alta qualidade
            </span>
            <br>
            <h1 style="color: #fff; font-size: 3rem;">Em um único <br> lugar</h1>
            <button data-action="comprar">Compra já</button>
        </div>
        <div class="hero-image">
            <img src="assets/images/pngwing.com.png" alt="Imagem do Hero" loading="lazy">
        </div>
    </div>
    `;

//Slider do Hero

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "flex" : "none";
    //Adicionar animaçao slide-In a cada slide
    if (i === index) {
      slide.classList.add("slide-in", "fade-in");
    } else {
      slide.classList.remove("slide-in", "fade-in");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

showSlide(currentSlide); // Show the first slide initially


