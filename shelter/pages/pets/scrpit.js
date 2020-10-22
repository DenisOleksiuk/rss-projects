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

    //pagination
    const buttons = document.querySelector('.friends__navigation'),
      first = document.querySelector("#first"),
      prev = document.querySelector("#prev"),
      next = document.querySelector("#next"),
      last = document.querySelector("#last"),
      thisPage = document.querySelector("#thisPage");

    const mainPage = [4, 0, 2, 1, 5, 7, 3, 6];
    let pageCount = 0;
    let limitPages = 0;
    let petsList = [...mainPage];

    if (window.innerWidth >= 1280) {
      limitPages = 5;
    } else if (window.innerWidth < 768) {
      limitPages = 15;
    } else {
      limitPages = 7;
    }
    if (pageCount >= 0) {
      first.disabled = true;
      prev.disabled = true;
    }

    for (let i = 0; i < 5; i++) {
      petsList.push(...shuffle(pets));
    }

    cardContainer.innerHTML = petsList.map(i => buildPetCard(pets[i], i)).join('');

    const cardsContainer = document.querySelectorAll(".friends__card");

    const getPrevPage = (page) => {
      cardsContainer.forEach(card => {
        card.classList.add('friends__card-active')
        setTimeout(() => {
          const top = parseInt(getComputedStyle(card).top);
          card.style.top = `calc(${top + page}px)`
          card.classList.remove('friends__card-active')
        }, 300)
      });

      pageCount--
      thisPage.innerText = pageCount + 1;
      if (pageCount <= 0) {
        prev.disabled = true;
        first.disabled = true

      } else {
        next.disabled = false;
        last.disabled = false;
      }
    }

    const getNextPage = (page) => {
      cardsContainer.forEach(card => {
        card.classList.add('friends__card-active')
        setTimeout(() => {
          card.style.top = `calc(-${930 * page}px)`
          card.classList.remove('friends__card-active')
        }, 300)
      });

      pageCount = page;
      thisPage.innerText = pageCount + 1;
      if (pageCount > 0) {
        first.disabled = false;
        prev.disabled = false;
      }
      if (pageCount === limitPages) {
        next.disabled = true;
        last.disabled = true;
      }
    }

    function shuffle(elem) {
      let result = [];
      do {
        const randomIdx = Math.floor(Math.random() * pets.length)
        if (result.indexOf(randomIdx) === -1) {
          result.push(randomIdx);
        } else {
          continue;
        }
      } while (result.length < 8);

      return result;
    }
console.log(cardContainer.clientHeight);
    buttons.addEventListener('click', (e) => {
      if (e.target.id === 'next' && pageCount < limitPages) {
        getNextPage(pageCount + 1);
      }

      if (e.target.id === 'prev' && pageCount > 0) {
        getPrevPage(cardContainer.clientHeight);
      }

      if (e.target.id === 'last') {
        getNextPage(limitPages)
      }

      if (e.target.id === 'first') {
        cardsContainer.forEach(card => {
          card.classList.add('friends__card-active')
          setTimeout(() => {
            const top = parseInt(getComputedStyle(card).top);
            card.style.top = `calc(${top - top}px)`
            card.classList.remove('friends__card-active')
          }, 300)
        });
  
        pageCount = 0
        thisPage.innerText = pageCount + 1;
          prev.disabled = true;
          first.disabled = true
          next.disabled = false;
          last.disabled = false;
      }
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