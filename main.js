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

// Dots generation
let canvas = document.querySelector('.dots');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FRAME_RATE = 30;
const FRAME_DIFF = 1000 / FRAME_RATE;

const SEPARATION = 35;
const OFFSET_X = 10;
const OFFSET_Y = 25;
const COUNT = 50;

const LOWER_RANGE = .005;
const UPPER_RANGE = .3;
const INITIAL_VALUE = .01;
const INCREASE_BRIGHTNESS_PERCENTILE = .98;

const brightnessArray = new Array(COUNT * COUNT);
for(let x = 0; x < COUNT; x++) {
  for(let y = 0; y < COUNT; y++) {
    brightnessArray[x * COUNT + y] = INITIAL_VALUE;
  }
}

let now;
let prev;

function renderDots() {
  now = Date.now();
  let diff = now - prev;

  if(diff >= FRAME_DIFF) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let x = 0; x < COUNT; x++) {
      for(let y = 0; y < COUNT; y++) {
        let brightnessArrayPosition = x * COUNT + y;

        if(Math.random() > INCREASE_BRIGHTNESS_PERCENTILE && brightnessArray[brightnessArrayPosition] <= UPPER_RANGE) {
          brightnessArray[brightnessArrayPosition] = brightnessArray[brightnessArrayPosition] + .04;
        } else if(brightnessArray[brightnessArrayPosition] > LOWER_RANGE) {
          brightnessArray[brightnessArrayPosition] = brightnessArray[brightnessArrayPosition] - .001;
        }

        ctx.beginPath();
        ctx.arc(Math.floor(x * SEPARATION + OFFSET_X), Math.floor(y * SEPARATION + OFFSET_Y), 1 * (brightnessArray[brightnessArrayPosition] + 1), 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightnessArray[brightnessArrayPosition]})`;
        ctx.fill();
      }
    }

    prev = now;
  }

  requestAnimationFrame(renderDots);
}

prev = Date.now();
renderDots();