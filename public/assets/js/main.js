

document.addEventListener('DOMContentLoaded', function () {

  'use strict';

  
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 600);
    });
    
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 3000);
  }

  
  const navbar = document.querySelector('.navbar-eb');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Run on load

  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-eb .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (navbarToggler) navbarToggler.click();
      }
    });
  });

  
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
      disable: 'mobile'
    });
  }

  
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    function updateCounter() {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    updateCounter();
  }

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  
  const backToTop = document.querySelector('.back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility);

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const fields = contactForm.querySelectorAll('[required]');

      fields.forEach(function (field) {
        
        field.classList.remove('is-invalid');

        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        }

        
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            field.classList.add('is-invalid');
            isValid = false;
          }
        }

        
        if (field.type === 'tel' && field.value.trim()) {
          const phoneRegex = /^[+]?[\d\s()-]{7,15}$/;
          if (!phoneRegex.test(field.value.trim())) {
            field.classList.add('is-invalid');
            isValid = false;
          }
        }
      });

      if (isValid) {
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.disabled = true;
        submitBtn.style.background = '#27AE60';

        setTimeout(function () {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }
    });

    
    contactForm.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }

  
  if (typeof Swiper !== 'undefined') {
    
    const partnerSwiper = document.querySelector('.partner-swiper');
    if (partnerSwiper) {
      new Swiper('.partner-swiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 }
        }
      });
    }
  }

  
  const typedElement = document.querySelector('.typed-text');

  if (typedElement) {
    const words = JSON.parse(typedElement.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 400;
      }

      setTimeout(typeEffect, typingDelay);
    }

    if (words.length > 0) typeEffect();
  }

  
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  if (parallaxBgs.length > 0) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      parallaxBgs.forEach(function (bg) {
        bg.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
      });
    });
  }

  
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
