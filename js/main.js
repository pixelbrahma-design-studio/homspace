/* HOMSPACE — main.js v2 */

(() => {
  'use strict';

  /* ── WhatsApp Sticky Float ──────────────────────────── */
  const waFloat = document.createElement('a');
  waFloat.href = 'https://wa.me/919778063015?text=Hi%20HOMSPACE!%20I%27d%20like%20to%20enquire%20about%20your%20furnishing%20services.';
  waFloat.target = '_blank';
  waFloat.rel = 'noopener noreferrer';
  waFloat.className = 'wa-float';
  waFloat.setAttribute('aria-label', 'Chat on WhatsApp');
  waFloat.innerHTML = `
    <div class="wa-pulse-ring"></div>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.532 5.845L.054 23.625 6.012 22.12A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.002-1.37l-.357-.213-3.713.974.993-3.63-.232-.374A9.817 9.817 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182c5.428 0 9.818 4.39 9.818 9.818 0 5.427-4.39 9.818-9.818 9.818z"/>
    </svg>
    <span class="wa-float-label">Chat with us</span>`;
  document.body.appendChild(waFloat);
  setTimeout(() => waFloat.classList.add('show'), 1800);

  /* ── Navbar scroll ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger ──────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
        if (navMenu) {
          hamburger?.classList.remove('active');
          navMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ── Intersection observer (fade-up) ────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => io.observe(el));
  }

  /* ── Animated counter for trust bar ─────────────────── */
  const trustNums = document.querySelectorAll('.trust-num[data-target]');
  if (trustNums.length) {
    const counterIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.nextElementSibling?.textContent || '';
        const duration = 1800;
        const start    = performance.now();
        const update   = now => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    trustNums.forEach(el => counterIO.observe(el));
  }

  /* ── Form submit ────────────────────────────────────── */
  document.querySelectorAll('.enquiry-form, .mini-enquiry-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Request Received!';
        btn.style.background = '#22C55E';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 900);
    });
  });

  /* ── Product filter tabs ────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const productGroups = document.querySelectorAll('[data-category]');
  if (filterBtns.length && productGroups.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.filter;
        productGroups.forEach(group => {
          group.style.display = (target === 'all' || group.dataset.category === target) ? '' : 'none';
        });
      });
    });
  }

  /* ── Enquire buttons → scroll to cta/contact ────────── */
  document.querySelectorAll('[data-enquire]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById('enquire') || document.getElementById('contact');
      if (target) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      } else {
        window.location.href = '../index.html#contact';
      }
    });
  });

})();
