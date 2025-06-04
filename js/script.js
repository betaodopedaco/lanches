// Pré-loader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 800);
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1300);
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Botão voltar ao topo
document.querySelector('.back-to-top').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
const mobileNavClose = document.querySelector('.mobile-nav-close');

navToggle.addEventListener('click', function() {
  mobileNav.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});
mobileNavClose.addEventListener('click', function() {
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});
overlay.addEventListener('click', function() {
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Validação de formulário
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name === '' || email === '' || message === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    alert('Pedido enviado com sucesso! Entraremos em contato em breve para confirmar os detalhes.');
    contactForm.reset();
  });
}

// Product Carousel
const carousel = document.getElementById('productCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('carouselIndicators');
const items = document.querySelectorAll('.carousel-item');
const itemCount = items.length;
let currentIndex = 0;

// Criação dos indicadores
function createIndicators() {
  indicators.innerHTML = '';
  for (let i = 0; i < itemCount; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === currentIndex) indicator.classList.add('active');
    indicator.dataset.index = i;
    indicator.addEventListener('click', function() {
      goToSlide(parseInt(this.dataset.index));
    });
    indicators.appendChild(indicator);
  }
}
createIndicators();

function goToSlide(index) {
  if (index < 0) index = itemCount - 1;
  else if (index >= itemCount) index = 0;
  currentIndex = index;
  const itemWidth = items[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(carousel).gap);
  const scrollPosition = currentIndex * (itemWidth + gap);
  carousel.style.transform = `translateX(-${scrollPosition}px)`;
  document.querySelectorAll('.indicator').forEach((ind, i) => {
    ind.classList.toggle('active', i === currentIndex);
  });
}

prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
setInterval(() => goToSlide(currentIndex + 1), 5000);
window.addEventListener('resize', () => {
  goToSlide(currentIndex);
  createIndicators();
});
