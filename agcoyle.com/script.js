const body = document.body;
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('nav-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
let lastGalleryTrigger = null;

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  body.classList.remove('lightbox-open');
  lastGalleryTrigger?.focus();
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lastGalleryTrigger = item;
    lightboxImage.src = item.dataset.full || '';
    lightboxImage.alt = item.querySelector('img')?.alt || 'A.G. Coyle project';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
    body.classList.remove('nav-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('#project-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fullName = `${data.get('firstName')} ${data.get('lastName')}`.trim();
  const subject = encodeURIComponent(`Project inquiry from ${fullName}`);
  const message = encodeURIComponent([
    `Name: ${fullName}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Project type: ${data.get('projectType')}`,
    '',
    'Project details:',
    data.get('details'),
  ].join('\n'));
  window.location.href = `mailto:alan@agcoyle.com?subject=${subject}&body=${message}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
