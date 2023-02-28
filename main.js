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

for(let card of cards) {
  card.addEventListener('mouseenter', (event) => {
    event.target.classList.add('project-card--highlight');
  });

  card.addEventListener('mouseleave', (event) => {
    event.target.classList.remove('project-card--highlight');
  });
}