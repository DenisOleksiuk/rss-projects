const humb = document.querySelector('.humb');
const menu = document.querySelector('.menu');

function active() {
  humb.classList.toggle('humb__active');
  menu.classList.toggle('menu__active');
}
humb.addEventListener('click', active);
