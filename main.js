// Style header on final position
const element = document.querySelector('#site-header');
const observer = new IntersectionObserver((element) => {
  if(element[0].intersectionRatio <  1)
    element[0].target.classList.add('centered-container--stuck');
  else 
    element[0].target.classList.remove('centered-container--stuck');
}, {threshold: 1});

observer.observe(element);

// Move projects higlight based on mouse position
let cards = document.getElementsByClassName('project-card');
document.addEventListener('mousemove', (event) => {
  let x = event.clientX, y = event.clientY;

  for(let card of cards) {
      let cardPos = card.getBoundingClientRect();

      card.style = `--highlight-x: ${x - cardPos.left}px; --highlight-y: ${y - cardPos.top}px;`;
  }
});

// Navigation control
let hamburgerButton = document.querySelector('.hamburger');
let siteNavigation = document.querySelector('.site-navigation');
hamburgerButton.addEventListener('touchend', (event) => {
  let open = siteNavigation.getAttribute('data-open') === 'true';
  siteNavigation.setAttribute('data-open', !open);
});

siteNavigation.querySelectorAll('.site-navigation__list-item-link').forEach(element => {
  element.addEventListener('touchstart', (event) => {
    if(event.currentTarget.tagName !== 'A') return;

    setTimeout(() => {
      siteNavigation.setAttribute('data-open', false);
    }, 500);
  });
});