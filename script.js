const siteHeader = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobile-nav');
const hero = document.querySelector('.mw-hero');
const heroActions = document.getElementById('heroActions');
const revealItems = document.querySelectorAll('.mw-reveal');
const teamCards = document.querySelectorAll('.mw-team-card');
const modalOverlay = document.getElementById('teamModalOverlay');
const modalTitle = document.getElementById('team-member-modal-title');
const modalRole = document.getElementById('modalRole');
const modalBio = document.getElementById('modalBio');
const modalDetails = document.getElementById('modalDetails');
const modalImage = document.getElementById('modalImage');
const closeTeamModal = document.getElementById('closeTeamModal');

menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('mw-nav-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('mw-nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  });
});

function handleHeaderScroll() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('mw-header-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

if (hero && heroActions) {
  heroActions.addEventListener('mouseenter', () => hero.classList.add('mw-hero-hover'));
  heroActions.addEventListener('mouseleave', () => hero.classList.remove('mw-hero-hover'));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('mw-reveal-visible');
    });
  },
  { threshold: 0.15 }
);
revealItems.forEach((item) => observer.observe(item));

function openTeamModal(card) {
  if (!card) return;
  modalTitle.textContent = card.dataset.name || '';
  modalRole.textContent = card.dataset.role || '';
  modalBio.textContent = card.dataset.bio || '';
  modalDetails.textContent = card.dataset.details || '';
  modalImage.src = card.dataset.image || '';
  modalImage.alt = card.dataset.name || 'Team member';
  modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

teamCards.forEach((card) => {
  card.querySelector('.mw-member-button')?.addEventListener('click', () => openTeamModal(card));
});

closeTeamModal?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

document.querySelector('.mw-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
});
