/**
 * Lightheart Marketing Website - Main JavaScript
 * Campaign-focused: conversion tracking, analytics, engagement
 */

// ===== Mobile Menu =====
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });
}

// ===== Header Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
    
    // Track FAQ interaction (for analytics)
    trackEvent('FAQ', 'click', question.textContent.trim());
  });
});

// ===== Newsletter Form Handling =====
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Simulate submission
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Show success state
      form.innerHTML = `
        <div style="text-align: center; padding: var(--space-lg);">
          <div style="font-size: 3rem; margin-bottom: var(--space-md);">✓</div>
          <h3 style="color: var(--color-gold); margin-bottom: var(--space-sm);">You're in.</h3>
          <p style="color: var(--color-text-muted);">Welcome to the inner circle. Check your inbox for confirmation.</p>
        </div>
      `;
      
      // Track conversion
      trackEvent('Newsletter', 'signup', window.location.pathname);
      
      // Store in localStorage for retargeting
      localStorage.setItem('lightheart_newsletter_signed_up', 'true');
      localStorage.setItem('lightheart_signup_date', new Date().toISOString());
      
    }, 1500);
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      trackEvent('Navigation', 'scroll_to', targetId);
    }
  });
});

// ===== Button Click Tracking =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnText = btn.textContent.trim();
    const btnHref = btn.getAttribute('href') || 'no-href';
    trackEvent('CTA', 'click', `${btnText} | ${btnHref}`);
  });
});

// ===== Analytics / Event Tracking =====
function trackEvent(category, action, label) {
  // Google Analytics 4 (when implemented)
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
  
  // Console log for debugging
  console.log('[Track]', category, action, label);
  
  // Store events in localStorage for batching
  const events = JSON.parse(localStorage.getItem('lightheart_events') || '[]');
  events.push({
    category,
    action,
    label,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
  localStorage.setItem('lightheart_events', JSON.stringify(events.slice(-50))); // Keep last 50
}

// ===== Page View Tracking =====
function trackPageView() {
  const page = window.location.pathname;
  const referrer = document.referrer;
  const utmSource = getUrlParam('utm_source');
  const utmMedium = getUrlParam('utm_medium');
  const utmCampaign = getUrlParam('utm_campaign');
  
  trackEvent('Page', 'view', page);
  
  // Store UTM params for attribution
  if (utmSource) {
    localStorage.setItem('lightheart_utm_source', utmSource);
    localStorage.setItem('lightheart_utm_medium', utmMedium || '');
    localStorage.setItem('lightheart_utm_campaign', utmCampaign || '');
  }
  
  console.log('[Page View]', { page, referrer, utmSource, utmMedium, utmCampaign });
}

// ===== URL Parameter Helper =====
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ===== Exit Intent Popup (for newsletter) =====
let exitIntentShown = false;

if (!localStorage.getItem('lightheart_newsletter_signed_up')) {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10 && !exitIntentShown) {
      exitIntentShown = true;
      // Could trigger a modal here
      trackEvent('Engagement', 'exit_intent', window.location.pathname);
    }
  });
}

// ===== Scroll Depth Tracking =====
let scrollDepths = [25, 50, 75, 90];
let trackedDepths = [];

window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  
  scrollDepths.forEach(depth => {
    if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
      trackedDepths.push(depth);
      trackEvent('Engagement', 'scroll_depth', `${depth}%`);
    }
  });
});

// ===== Time on Page Tracking =====
let timeOnPage = 0;
setInterval(() => {
  timeOnPage += 10;
  if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 180) {
    trackEvent('Engagement', 'time_on_page', `${timeOnPage}s`);
  }
}, 10000);

// ===== Founding Member Counter Animation =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Initialize counters when they come into view
const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.counter);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
});

counters.forEach(counter => counterObserver.observe(counter));

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  trackPageView();
  
  // Check for returning visitor
  if (localStorage.getItem('lightheart_newsletter_signed_up')) {
    document.body.classList.add('is-returning-subscriber');
  }
  
  console.log('[Lightheart] Marketing site initialized');
});

// ===== Beforeunload - capture final engagement =====
window.addEventListener('beforeunload', () => {
  trackEvent('Engagement', 'total_time', `${timeOnPage}s`);
});
