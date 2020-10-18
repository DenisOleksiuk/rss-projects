const cardContainer = document.querySelector('.pets__inner'),
  modalLayer = document.querySelector('.modal'),
  modal = modalLayer.querySelector('.modal__window'),
  modalImg = modal.querySelector('.modal__img'),
  title = modal.querySelector('.modal__title'),
  subTitle = modal.querySelector('.modal__subtitle'),
  text = modal.querySelector('.modal__text'),
  [age, inoculaties, diseases, parasites] = modal.querySelectorAll('.modal__item'),
  closeBtn = modal.querySelector('.modal__close-btn');

// modal window
fetch('pets.json')
  .then(response => response.json())
  .then(pets => {
    cardContainer.addEventListener('click', (event) => {
      if (event.target === cardContainer) return;

      prepareModal(pets[event.target.closest('.pets__card').dataset.i]);
      modalLayer.hidden = false;
    });

    cardContainer.innerHTML = [4, 0, 2].map(i => buildPetCard(pets[i], i)).join('');
  })

function prepareModal(pet) {
  title.innerText = pet.name;
  modalImg.src = pet.img;
  subTitle.innerText = pet.type + ' - ' + pet.breed;
  text.innerText = pet.description;
  age.innerHTML = `<strong>Age:</strong> ${pet.age}`;
  inoculaties.innerHTML = `<strong>Inoculations:</strong> ${pet.inoculations}`;
  diseases.innerHTML = `<strong>Diseases:</strong> ${pet.diseases}`;
  parasites.innerHTML = `<strong>Parasites:</strong> ${pet.parasites}`;
}

closeBtn.addEventListener('click', () => modalLayer.hidden = true);

modalLayer.addEventListener('click', (event) => {
  if (event.target === modalLayer) modalLayer.hidden = true;
});

function buildPetCard(pet, i) {
  return `
    <div class="pets__card" data-i="${i}">
      <img src="${pet.img}" alt="${pet.type} ${pet.name}">
      <div class="pets__card-title">${pet.name}</div>
      <button class="pets__btn">Learn more</button>
    </div>
  `
}

//header: disabled element and logo
const items = document.querySelectorAll('#disabled'),
  logoTitle = document.querySelector('.header__title');

logoTitle.addEventListener('click', (event) => event.preventDefault());

items.forEach(item => {
  item.addEventListener('click', (elem) => {
    elem.preventDefault();
  })
});

//burger 
const humburger = document.querySelector('.humburger'),
  burger = document.querySelector('.burger'),
  logo = document.querySelector('.header__logo'),
  menu = document.querySelector('.header__menu-list'),
  burgerLogo = menu.querySelector('.burger__logo').addEventListener('click', (elem) => elem.preventDefault());

function openMenu() {
  humburger.classList.toggle('humburger__active');
  burger.classList.toggle('burger__active');
  menu.classList.toggle('header__menu-list__active');
  logo.style.visibility = 'hidden';
}

function closeMenu() {
  burger.classList.toggle('burger__active');
  humburger.classList.toggle('humburger__active');
  menu.classList.toggle('header__menu-list__active');
  logo.style.visibility = 'visible';
}


humburger.addEventListener('click', openMenu);
burger.addEventListener('click', closeMenu);