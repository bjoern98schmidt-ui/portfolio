// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Slider
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

prev.addEventListener('click', () => {
    stopAutoSlide();
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    startAutoSlide();
});

next.addEventListener('click', () => {
    stopAutoSlide();
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    startAutoSlide();
});

showSlide(currentSlide);
startAutoSlide();

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleButton.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Scroll-Animation mit Intersection Observer
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id !== 'about') {
        section.classList.add('hidden');
        observer.observe(section);
    }
});

// NEUER CODE: Scroll-Animation für Hero-Text (h1 und p)
const heroSection = document.getElementById('home');
const heroH1 = heroSection.querySelector('h1');
const heroP = heroSection.querySelector('p');
let animationDone = false;

function handleHeroScroll() {
    if(animationDone) return;

    const scrollY = window.scrollY || window.pageYOffset;

    if(scrollY > 10) { // Starte Animation beim ersten Scrollen
        animationDone = true;

        // Seite fixieren
        const savedScrollY = scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';

        // Animation starten
        heroH1.classList.add('intro-center');
        heroP.classList.add('intro-center');

        // Nach Animation fixierung lösen
        setTimeout(() => {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, savedScrollY);
        }, 1000); // Dauer der Animation + Puffer
    }
}

window.addEventListener('scroll', handleHeroScroll, { passive: true });
