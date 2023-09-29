// script.js

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

// Función para mostrar una diapositiva específica
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    }
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
    });
}

// Evento al hacer clic en el botón "Anterior"
prevBtn.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

// Evento al hacer clic en el botón "Siguiente"
nextBtn.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

// Mostrar la primera diapositiva al cargar la página
showSlide(currentIndex);
