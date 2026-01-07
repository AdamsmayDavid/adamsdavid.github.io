document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // NAVBAR TOGGLE + SHRINK
    // -------------------------
    const navbar = document.querySelector('.navbar');
    const toggler = document.getElementById('NavBar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const logo = document.querySelector('.navbar-brand img'); // assumes <img> inside navbar-brand

    // Hamburger toggle
      toggler.addEventListener('click', () => {
      toggler.classList.toggle('active');  
      navbar.classList.toggle('nav-bg');
    });

    // Reset hamburger when menu closes
    navbarCollapse.addEventListener('hidden.bs.collapse', () => {
      toggler.classList.remove('active');
      navbar.classList.remove('nav-bg');
    });

    // Navbar shrink on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        navbar.classList.add('shrink');

        // Change nav links color to black
        navLinks.forEach(link => link.style.color = '#000');

        // Change logo src
        if (logo) logo.src = 'assets/logo-dark.png'; // replace with your dark logo
      } else {
        navbar.classList.remove('shrink');

        // Reset nav links color to white
        navLinks.forEach(link => link.style.color = '#fff');

        // Reset logo src
        if (logo) logo.src = 'assets/logo-light.png'; // replace with your light logo
      }
    });

  // -------------------------
  // HERO SECTION ANIMATIONS
  // -------------------------
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.animate').forEach(el => heroObserver.observe(el));

  const overlay = document.querySelector('.overlay-image');
  window.addEventListener('scroll', () => {
    if (!overlay) return;
    overlay.style.transform = `scale(${1 + window.scrollY * 0.0008})`;
  });

  const btn = document.querySelector('.get-in-touch');
  if (btn && overlay) {
    const img1 = overlay.querySelector('.img1');
    const img2 = overlay.querySelector('.img2');
    btn.addEventListener('mouseenter', () => { img1.style.opacity = 0; img2.style.opacity = 1; });
    btn.addEventListener('mouseleave', () => { img1.style.opacity = 1; img2.style.opacity = 0; });
  }

  // -------------------------
  // SKILLS PROGRESS BARS
  // -------------------------
  const skillSections = document.querySelectorAll(".skills-category");
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const fills = entry.target.querySelectorAll(".progress-fill");
      if (entry.isIntersecting) {
        fills.forEach((fill, idx) => {
          const percent = fill.parentElement.dataset.percent;
          setTimeout(() => {
            fill.style.width = percent + "%";
            fill.querySelector('span').textContent = percent + "%";
          }, idx * 150);
        });
      } else {
        fills.forEach(fill => {
          fill.style.width = "0%";
          fill.querySelector('span').textContent = "0%";
        });
      }
    });
  }, { threshold: 0.3 });
  skillSections.forEach(section => skillsObserver.observe(section));

});


//experience
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-content");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    items.forEach(item => {
      const boxTop = item.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        item.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});


// Fade-in timeline cards on scroll
const timelineCards = document.querySelectorAll('.timeline-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // optional: reset
    }
  });
}, { threshold: 0.2 });

timelineCards.forEach(card => observer.observe(card));


document.querySelectorAll(".carousel-track.auto").forEach(track => {
  let speed = track.classList.contains("reverse") ? -0.25 : 0.25;
  let position = 0;
  let isPaused = false;
  const halfWidth = track.scrollWidth / 2;

  function animate() {
    if (!isPaused) {
      position -= speed;
      track.style.transform = `translateX(${position}px)`;

      if (speed > 0 && position <= -halfWidth) position = 0;
      if (speed < 0 && position >= 0) position = -halfWidth;
    }
    requestAnimationFrame(animate);
  }

  track.addEventListener("mouseenter", () => isPaused = true);
  track.addEventListener("mouseleave", () => isPaused = false);

  animate();
});
