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
    
    // Validação básica
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || email === '' || message === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Simular envio
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

// Create indicators
function createIndicators() {
  indicators.innerHTML = ''; // Clear existing indicators
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
createIndicators(); // Initial creation

function goToSlide(index) {
  if (index < 0) index = itemCount - 1;
  else if (index >= itemCount) index = 0;
  
  currentIndex = index;
  
  // Calculate scroll position based on current item and gap
  const itemWidth = items[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(carousel).gap);
  const scrollPosition = currentIndex * (itemWidth + gap);

  carousel.style.transform = `translateX(-${scrollPosition}px)`;
  
  // Update indicators
  document.querySelectorAll('.indicator').forEach((ind, i) => {
    if (i === currentIndex) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });
}

prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// Auto slide
setInterval(() => goToSlide(currentIndex + 1), 5000);

// Recalculate slide position on resize
window.addEventListener('resize', () => {
  goToSlide(currentIndex); // Adjust current slide position
  createIndicators(); // Recreate indicators if needed (e.g., if item count changes on resize, though not in this case)
});

// 3D hover effects (desativados para mobile nas media queries)
document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .team-member, .hero-image').forEach(card => {
  // Check if device is likely touch-enabled or if screen width is small
  const isMobile = window.matchMedia("(max-width: 992px)").matches;
  if (isMobile) {
    card.style.transform = 'none'; // Ensure no 3D transform on mobile
    return; // Skip adding mousemove listener
  }

  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});
