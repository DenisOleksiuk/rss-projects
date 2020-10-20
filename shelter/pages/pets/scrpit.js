// modal window
const cardContainer = document.querySelector('.friends__cards'),
  modalLayer = document.querySelector('.modal'),
  modal = modalLayer.querySelector('.modal__window'),
  modalImg = modal.querySelector('.modal__img'),
  title = modal.querySelector('.modal__title'),
  subTitle = modal.querySelector('.modal__subtitle'),
  text = modal.querySelector('.modal__text'),
  [age, inoculaties, diseases, parasites] = modal.querySelectorAll('.modal__item'),
  closeBtn = modal.querySelector('.modal__close-btn');

fetch('../../pets.json')
  .then(response => response.json())
  .then(pets => {
    let res = [];
    for (let i = 0; i < 6; i++) {
      res.push(pets)
    }
    console.log(res);
    cardContainer.addEventListener('click', (event) => {
      if (event.target === cardContainer) return;

      prepareModal(pets[event.target.closest('.friends__card').dataset.i]);
      modalLayer.hidden = false;
    });

    let arr = [];
    
    for (const pet in pets) {
      if (pets.hasOwnProperty(pet)) {
        arr.push(pet);
      }
    }
    
    for (let i = 0; i < arr.length; i++) {
      if (i == 0 || i == 1 || i == 2) {
        arr.splice(i, 1)
      }
    }

    let arr2 = [4, 0, 2].map(i => buildPetCard(pets[i], i));
    arr2.push(...arr.map(i => buildPetCard(pets[i], i)));
    cardContainer.innerHTML = arr2.join('')
  });


function prepareModal(pet) {
  title.innerText = pet.name;
  modalImg.src = pet.img;
  subTitle.innerText = `${pet.type} - ${pet.breed}`;
  text.innerText = pet.description;
  age.innerHTML = `<strong>Age:</strong> ${pet.age}`;
  inoculaties.innerHTML = `<strong>Inoculations:</strong> ${pet.inoculations}`;
  diseases.innerHTML = `<strong>Diseases:</strong> ${pet.diseases}`;
  parasites.innerHTML = `<strong>Parasites:</strong> ${pet.parasites}`;
}

function buildPetCard(pet, i) {
  return `
    <div class="friends__card" data-i="${i}">
      <img src="${pet.img}" alt="${pet.type} ${pet.name}">
      <div class="friends__card-title">${pet.name}</div>
      <button class="friends__btn">Learn more</button>
    </div>
  `
}

closeBtn.addEventListener('click', () => modalLayer.hidden = true);

modalLayer.addEventListener('click', (event) => {
  if (event.target === modalLayer) modalLayer.hidden = true;
});

//header: disabled element menu and logo
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
  logo.style.opacity = 0;
  document.addEventListener('click', closeBurgerOutSide);
}

function closeMenu() {
  burger.classList.toggle('burger__active');
  humburger.classList.toggle('humburger__active');
  menu.classList.toggle('header__menu-list__active');
  logo.style.opacity = 1;
  document.removeEventListener('click', closeBurgerOutSide)
}

function closeBurgerOutSide(e) {
  if (!menu.contains(e.target) && !humburger.contains(e.target)) {
    closeMenu();
  }
}

humburger.addEventListener('click', openMenu);
burger.addEventListener('click', closeMenu);

//slider