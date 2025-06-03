document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate offset for fixed header
          const headerOffset = 80; // Adjust this value to your header's height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
  
          // Close mobile menu after clicking a link
          if (menuToggle.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
          }
        }
      });
    });
  
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
  
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  
    // Slider functionality for testimonials
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    const slides = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
  
    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      const offset = -currentIndex * 100;
      slider.style.transform = `translateX(${offset}%)`;
      updateIndicators();
    }
  
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
  
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }
  
    function createIndicators() {
      indicatorsContainer.innerHTML = ''; // Clear existing indicators
      slides.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentIndex) {
          indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
      });
    }
  
    function updateIndicators() {
      document.querySelectorAll('.slider-indicators .indicator').forEach((indicator, i) => {
        if (i === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
  
    // Initialize slider
    createIndicators();
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  
    // Auto-slide (optional)
    let slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
  
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
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  });
