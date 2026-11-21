(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Music starts only after the visitor presses the music button (browser-friendly).
  const music = $('#bgMusic');
  const musicBtn = $('#musicBtn');
  if (music && musicBtn) {
    musicBtn.addEventListener('click', async () => {
      if (music.paused) {
        try { await music.play(); musicBtn.textContent = '⏸ Pause music'; musicBtn.classList.add('playing'); }
        catch { musicBtn.textContent = 'Tap to play music'; }
      } else {
        music.pause(); musicBtn.textContent = '♫ Play music'; musicBtn.classList.remove('playing');
      }
    });
    music.addEventListener('ended', () => { musicBtn.textContent = '♫ Play music'; musicBtn.classList.remove('playing'); });
  }

  // Mobile navigation.
  const menuButton = $('#menuToggle');
  const menu = $('#navMenu');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '✕' : '☰';
    });
    $$('.nav-link', menu).forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰';
    }));
  }

  // Scroll progress, navbar depth, and back-to-top.
  const progress = $('#progressBar');
  const backTop = $('#backTop');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    if (backTop) backTop.classList.toggle('visible', scrollY > 500);
    const nav = $('.navbar');
    if (nav) nav.style.boxShadow = scrollY > 20 ? '0 8px 28px rgba(91,65,112,.10)' : 'none';
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  backTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Gentle reveal animation; content remains visible if IntersectionObserver is unavailable.
  const revealItems = $$('section, .timeline-content, .gallery-item, .message-card, .favorite-item, .moment-card');
  revealItems.forEach(item => item.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Photo lightbox.
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightboxImage');
  const lightboxCaption = $('#lightboxCaption');
  const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  $$('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = img.currentSrc || img.src;
      lightboxImage.alt = img.alt;
      if (lightboxCaption) lightboxCaption.textContent = img.closest('.gallery-item')?.querySelector('.gallery-caption')?.textContent || img.alt;
      lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    });
  });
  $('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Surprise reveal and celebration burst.
  const surpriseBtn = $('#surpriseBtn');
  const surpriseContent = $('#surpriseContent');
  surpriseBtn?.addEventListener('click', () => {
    const reveal = surpriseContent?.classList.toggle('hidden') === false;
    surpriseBtn.textContent = reveal ? '💗 A little more love revealed' : '💝 Click me for a surprise 💝';
    if (reveal) celebration();
  });
  function celebration() {
    const symbols = ['💗','💜','🤍','✨','🌷','💕'];
    for (let i = 0; i < 28; i++) {
      const particle = document.createElement('span');
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      Object.assign(particle.style, { position:'fixed', left:`${Math.random()*100}vw`, top:'-30px', zIndex:2500, pointerEvents:'none', fontSize:`${16+Math.random()*16}px`, transition:`transform ${2+Math.random()*1.4}s linear, opacity 3s` });
      document.body.appendChild(particle);
      requestAnimationFrame(() => { particle.style.transform = `translate(${(Math.random()-.5)*120}px, ${innerHeight+80}px) rotate(${Math.random()*360}deg)`; particle.style.opacity = '0'; });
      setTimeout(() => particle.remove(), 3600);
    }
  }


  // Countdown to the next June 11 (updates automatically every second).
  const countdownEls = { days: $('#countDays'), hours: $('#countHours'), minutes: $('#countMinutes'), seconds: $('#countSeconds') };
  function updateCountdown() {
    const now = new Date();
    let target = new Date(now.getFullYear(), 5, 11, 0, 0, 0);
    if (now >= target) target = new Date(now.getFullYear() + 1, 5, 11, 0, 0, 0);
    let remaining = Math.max(0, target - now);
    const values = { days: Math.floor(remaining / 86400000) };
    remaining %= 86400000;
    values.hours = Math.floor(remaining / 3600000); remaining %= 3600000;
    values.minutes = Math.floor(remaining / 60000); remaining %= 60000;
    values.seconds = Math.floor(remaining / 1000);
    Object.entries(values).forEach(([key, value]) => { if (countdownEls[key]) countdownEls[key].textContent = String(value).padStart(2, '0'); });
  }
  updateCountdown(); setInterval(updateCountdown, 1000);

  // Keep the someday-list ticks on this device.
  const bucketChecks = $$('.bucket-grid input[type="checkbox"]');
  bucketChecks.forEach((box, index) => {
    const key = `our-little-universe-bucket-${index}`;
    box.checked = localStorage.getItem(key) === 'true';
    box.addEventListener('change', () => localStorage.setItem(key, String(box.checked)));
  });

  // Respect reduced-motion preferences.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.body.classList.add('no-motion');
})();
