const header = document.querySelector('[data-header]');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
const closeMenu = () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
};

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-compare]').forEach((comparison) => {
  const range = comparison.querySelector('[data-compare-range]');
  range.addEventListener('input', () => comparison.style.setProperty('--position', `${range.value}%`));
});

const reviews = [
  { text: 'Dino stands by his word and always suggests the best ways to consider your project. His team has a great sense of detail and neatness.', name: 'Elsa Burgos', place: 'Elmwood Park, Illinois' },
  { text: 'They are diligent and responsive. Dino offers sound advice and helpful guidance during design, and provides innovative solutions to tough problems.', name: 'Sarp U.', place: 'Winnetka, Illinois' },
  { text: 'Everything was done on time and on budget, and the building managers gave only positive feedback about following the rules and limiting disruption.', name: 'J.P.D.', place: 'Chicago, Illinois' },
  { text: 'The work is exceptional, the workers are all great, and after they are done everything is clean and put away.', name: 'Anne F.', place: 'Skokie, Illinois' },
];

let reviewIndex = 0;
const reviewText = document.querySelector('[data-review]');
const reviewPerson = document.querySelector('[data-person]');
const reviewCount = document.querySelector('[data-count]');

const renderReview = (nextIndex) => {
  reviewIndex = (nextIndex + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  reviewText.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
  reviewText.textContent = review.text;
  reviewPerson.innerHTML = `<b>${review.name}</b><span>${review.place}</span>`;
  reviewCount.textContent = `${String(reviewIndex + 1).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
};

document.querySelector('[data-prev]').addEventListener('click', () => renderReview(reviewIndex - 1));
document.querySelector('[data-next]').addEventListener('click', () => renderReview(reviewIndex + 1));

document.querySelector('[data-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Estimate request from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nProject location: ${data.get('location') || 'Not provided'}\n\nProject details:\n${data.get('project')}`);
  window.location.href = `mailto:dino@dandmmillennium.com?subject=${subject}&body=${body}`;
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
