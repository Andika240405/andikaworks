// ===== JavaScript Portofolio =====
(function() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const backToTop = document.getElementById('back-to-top');

  // Cek localStorage untuk tema
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.add('fa-moon');
  }

  // Toggle tema
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Intersection Observer untuk animasi scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // Smooth scroll dengan offset navbar
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Form kontak demo
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target.querySelector('input[placeholder="Nama Anda"]').value;
      const email = e.target.querySelector('input[placeholder="Email Anda"]').value;
      const message = e.target.querySelector('textarea').value;

      try {
        const response = await fetch('http://localhost:5000/api/contact/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Pesan terkirim!');
          e.target.reset();
        } else {
          alert('Gagal: ' + data.error);
        }
      } catch (error) {
        alert('Terjadi kesalahan jaringan');
      }
    });
  }

  // ========== FITUR TAMBAHAN ==========

  // 1. Typed.js
  if (typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
      strings: ['Web Developer', 'Data Administrator', 'UI Designer'],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
      backDelay: 1500,
    });
  }

  // 2. Back to Top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Filter Proyek
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('show'), 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Testimonial Slider
  const dots = document.querySelectorAll('.dot');
  const testimonialItems = document.querySelectorAll('.testimonial-item');

  function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
  });

  let currentTestimonial = 0;
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // 5. Progress bar animasi
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'width 1s ease';
      }
    });
  }, { threshold: 0.5 });
  progressBars.forEach(bar => progressObserver.observe(bar));

  // 6. Counting Up Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('stats');

  function startCounting(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const targetText = stat.innerText; // misal "3+" atau "2"
          let targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
          if (isNaN(targetNumber)) targetNumber = 0;

          let current = 0;
          const increment = targetNumber / 50; // naik dalam 50 langkah
          const updateCounter = () => {
            current += increment;
            if (current < targetNumber) {
              stat.innerText = Math.ceil(current) + (targetText.includes('+') ? '+' : '');
              requestAnimationFrame(updateCounter);
            } else {
              stat.innerText = targetText; // kembalikan ke teks asli
            }
          };
          updateCounter();
        });
        observer.unobserve(entry.target);
      }
    });
  }

  const statsObserver = new IntersectionObserver(startCounting, { threshold: 0.5 });
  if (statsSection) statsObserver.observe(statsSection);
})();