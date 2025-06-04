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
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

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
  document.body.style.overflow =
