/**
 * Sanika Maheshwari - Portfolio Interactive Logic
 * Features:
 * - Dark/Light Theme Switching with localStorage persistence
 * - Hero Dynamic Typing Effect
 * - Interactive Project Filtering (All, AI/ML, Web Dev, Analytics)
 * - One-Click Copy to Clipboard with Toast Notification
 * - Active Scroll Spy Navigation
 * - Mobile Drawer Toggle
 * - Interactive Contact Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initProjectFilter();
  initScrollSpy();
  initMobileMenu();
  initClipboardCopy();
  initContactForm();
  initScrollEffects();
});

/* ----------------------------------------------------
   1. THEME SWITCHER (Dark / Light Mode)
---------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const storedTheme = localStorage.getItem('sm_theme');
  
  // Prefer stored theme, else system dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // default dark
  
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('sm_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!themeIcon) return;
    
    if (theme === 'light') {
      // Moon icon for light mode (click to switch to dark)
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      `;
    } else {
      // Sun icon for dark mode (click to switch to light)
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      `;
    }
  }
}

/* ----------------------------------------------------
   2. HERO TYPING ANIMATION
---------------------------------------------------- */
function initTypingEffect() {
  const typedTarget = document.getElementById('typedTarget');
  if (!typedTarget) return;

  const roles = [
    "MCA in AI & Machine Learning",
    "AI-Powered Application Developer",
    "Predictive Analytics & BI Specialist",
    "Full-Stack Web Enthusiast"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const delayBetweenWords = 1800;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delta = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delta = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delta = 400;
    }

    setTimeout(type, delta);
  }

  type();
}

/* ----------------------------------------------------
   3. PROJECT FILTERING
---------------------------------------------------- */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   4. ACTIVE SCROLL SPY NAVIGATION
---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar elevation effect
    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ----------------------------------------------------
   5. MOBILE MENU
---------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ----------------------------------------------------
   6. COPY TO CLIPBOARD & TOAST
---------------------------------------------------- */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastMsg');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast(`Copied to clipboard!`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ----------------------------------------------------
   7. INTERACTIVE CONTACT FORM
---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value || '';
    const email = document.getElementById('senderEmail')?.value || '';
    const subject = document.getElementById('senderSubject')?.value || 'Portfolio Contact';
    const message = document.getElementById('senderMessage')?.value || '';

    // Direct mailto link fallback for 100% reliability
    const mailtoLink = `mailto:sanika27012002@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
    
    // Friendly modal / alert feedback
    const toast = document.getElementById('toastMsg');
    if (toast) {
      toast.textContent = `Preparing email to Sanika...`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    window.location.href = mailtoLink;
    form.reset();
  });
}

/* ----------------------------------------------------
   8. SCROLL EFFECTS & BACK TO TOP
---------------------------------------------------- */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
