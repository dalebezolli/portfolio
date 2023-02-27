const element = document.querySelector('#site-header');
const observer = new IntersectionObserver((element) => {
  if(element[0].intersectionRatio <  1)
    element[0].target.classList.add('centered-container--stuck');
  else 
    element[0].target.classList.remove('centered-container--stuck');
}, {threshold: 1});

observer.observe(element);