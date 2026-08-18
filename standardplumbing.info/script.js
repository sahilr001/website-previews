const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const inquiryForm = document.querySelector('[data-inquiry-form]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);

const closeMenu = () => {
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
};

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver((entries, revealObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
  observer.observe(element);
});

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const fullName = `${data.get('firstName') || ''} ${data.get('lastName') || ''}`.trim();
  const subject = encodeURIComponent(`Quote request from ${fullName || 'website visitor'}`);
  const body = encodeURIComponent(
    `Name: ${fullName}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nService Needed: ${data.get('service') || 'Not specified'}\n\nMessage:\n${data.get('message')}`
  );
  window.location.href = `mailto:support@standardplumbing.info?subject=${subject}&body=${body}`;
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
