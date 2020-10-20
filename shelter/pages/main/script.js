// modal window
const cardContainer = document.querySelector('.pets__inner'),
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
    cardContainer.addEventListener('click', (event) => {
      if (event.target === cardContainer) return;

      prepareModal(pets[event.target.closest('.pets__card').dataset.i]);
      modalLayer.hidden = false;
    });

    let arr = [];

    for (const pet in pets) {
      if (pets.hasOwnProperty(pet)) {
        const el = pets[pet];
        arr.push(pet);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (i == 0 || i == 1 || i == 2) {
        arr.splice(i, 1)
      }
    }

    // let arr2 = [4, 0, 2].map(i => buildPetCard(pets[i], i));
    // arr2.push(...arr.map(i => buildPetCard(pets[i], i)));
    const ribbonLeft = createPetRibbon([4, 0, 2]);
    const ribbonCenter = createPetRibbon();
    const ribbonRight = createPetRibbon([4, 0, 2]);
    ribbonLeft.classList.add('pets__ribbon-left');
    ribbonRight.classList.add('pets__ribbon-right');

    cardContainer.append(ribbonLeft, ribbonCenter, ribbonRight);

    //slide
    const petCard = document.querySelectorAll('.pets__card'),
      prev = document.querySelector('.pets__arrow-left'),
      next = document.querySelector('.pets__arrow-right');

    function createPetRibbon(blackList) {
      let indices = [4, 0, 2];
      let availablePets = pets;
      if (blackList) {
        availablePets = pets.filter((_, i) => !blackList.includes(i));
        indices = randomIndices(availablePets);
      }
      const ribbon = document.createElement('div');
      ribbon.classList.add('pets__ribbon');
      if (innerWidth >= 1280) {
        ribbon.innerHTML = indices.map(i => buildPetCard(availablePets[i], i)).join('');
      } else if (innerWidth < 768) {
        ribbon.innerHTML = buildPetCard(pets[indices[0]]);
      } else {
        ribbon.innerHTML = indices.slice(0, 2).map(i => buildPetCard(availablePets[i], i)).join('');
      }
      return ribbon;
    }

    function buildPetCard(pet) {
      const i = pets.indexOf(pet)
      return `
        <div class="pets__card" data-i="${i}">
          <img src="${pet.img}" alt="${pet.type} ${pet.name}">
          <div class="pets__card-title">${pet.name}</div>
          <button class="pets__btn">Learn more</button>
        </div>
      `
    }

    next.addEventListener('click', () => {
      cardContainer.firstElementChild.remove();
      cardContainer.firstElementChild.classList.add('pets__ribbon-left');
      cardContainer.lastElementChild.classList.remove('pets__ribbon-right');
      const ribbonRight = createPetRibbon(getUsedIndices(cardContainer.lastElementChild));
      ribbonRight.classList.add('pets__ribbon-right');
      cardContainer.append(ribbonRight);
    });

    prev.addEventListener('click', () => {
      cardContainer.lastElementChild.remove();
      cardContainer.lastElementChild.classList.add('pets__ribbon-right');
      cardContainer.firstElementChild.classList.remove('pets__ribbon-left');
      const ribbonLeft = createPetRibbon(getUsedIndices(cardContainer.firstElementChild));
      ribbonLeft.classList.add('pets__ribbon-left');
      cardContainer.prepend(ribbonLeft);
    });

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

function randomIndices(arr) {
  let res = []
  do {
    const randomNum = Math.floor(Math.random() * arr.length);
    if (!res.includes(randomNum)) {
      res.push(randomNum);
    }
  } while (res.length < 3);

  return res;
}

function getUsedIndices(ribbon) {
  return [...ribbon.children].map(card => +card.dataset.i);
}

closeBtn.addEventListener('click', () => modalLayer.hidden = true);

modalLayer.addEventListener('click', (event) => {
  if (event.target === modalLayer) modalLayer.hidden = true;
});

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