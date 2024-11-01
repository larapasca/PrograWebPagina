// Flechas

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const itemWidth = 300; // Ancho de cada imagen
let clickCounters = Array(movieLists.length).fill(0); 

arrows.forEach((arrow, i) => {
    const movieList = movieLists[i];
    const itemCount = movieList.querySelectorAll("img").length;

    arrow.addEventListener("click", () => {
        const visibleItems = Math.floor(window.innerWidth / itemWidth); 
        const maxScroll = (itemCount - visibleItems) * itemWidth; 

        clickCounters[i]++;

        // nuevo desplazamiento
        const newTransform = Math.min(clickCounters[i] * itemWidth, maxScroll);

        movieList.style.transition = 'transform 0.5s ease'; 
        movieList.style.transform = `translateX(-${newTransform}px)`;

        // reinicio de contador
        if (newTransform >= maxScroll) {
            setTimeout(() => {
                clickCounters[i] = 0; 
                movieList.style.transition = 'transform 0.5s ease';
                movieList.style.transform = "translateX(0)"; 
            }, 1500); // tiempo de transicion
        }
    });
});

// TOGGLE modo oscuro y diurno
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".container, .movie-list-title, .navbar-container, .toggle, .rating-container, .movie-list-item-title, .movie-list-item-desc"
);

ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball.classList.toggle("active");
});


// menu e inicio
const menuItems = document.querySelectorAll('.menu-list-item a');

menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // saca la clase activa
        menuItems.forEach(i => i.parentElement.classList.remove('active'));
        
        // agrega al clickeado
        this.parentElement.classList.add('active');

        // inicio te lleva arriba
        if (this.getAttribute('href') === '#') {
            event.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    });
});


// Estrellas - local storage
const starRatings = document.querySelectorAll(".star-rating");

starRatings.forEach((starRating) => {
    const stars = starRating.querySelectorAll("i");
    const movieId = starRating.getAttribute("data-movie-id");

    // carga el rating guardado
    const savedRating = localStorage.getItem(movieId);
    if (savedRating) {
        // Set the active class for the saved rating
        stars.forEach((star, index) => {
            if (index < savedRating) {
                star.classList.add("active");
            }
        });
    }

    // loopea
    stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
            stars.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
            });
            // guarda el rating
            localStorage.setItem(movieId, index1 + 1); 
        });
    });
});



// FORMULARIO
document.querySelector(".mail-icon").addEventListener("click", function() {
    const formOverlay = document.getElementById("contactFormOverlay");
    formOverlay.classList.add("show");
    formOverlay.style.display = "flex";
});

// muestra un mensaje de agradecimiento
function showThankYouMessage(event) {
    event.preventDefault(); 

    document.getElementById("thankYouMessage").style.display = "block";

    const formElements = document.querySelectorAll(".contact-form-popup form, .contact-form-popup h2");
    formElements.forEach(el => el.style.display = "none");

    setTimeout(() => {
        event.target.submit(); 
        closeForm(); 
    }, 1500); 
}

// cerrar el form
function closeForm() {
    const formOverlay = document.getElementById("contactFormOverlay");
    formOverlay.classList.remove("show");
    setTimeout(() => {
        formOverlay.style.display = "none";
        resetForm(); // lo resetea
    }, 300);
}

// funcion de reseteo
function resetForm() {
    document.querySelector(".contact-form-popup form").reset();
    document.getElementById("thankYouMessage").style.display = "none";

    const formElements = document.querySelectorAll(".contact-form-popup form, .contact-form-popup h2");
    formElements.forEach(el => el.style.display = "block");
}




