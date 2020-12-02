import { cardData } from './cardData.js';
import { WordCard } from './wordCard.js';

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const cardsParent = document.querySelector('.cards');
const categoryCards = document.querySelectorAll('.category');
const nav = document.querySelector('.navigation');
const switcher = document.querySelector('.switcher');
const switcherInput = switcher.querySelector('.switcher__input');
const play = document.querySelector('.play');
const playBtn = play.querySelector('.play__btn');
const playSlider = play.querySelector('.play__slider');
const playInput = play.querySelector('.play__input');

const correct = new Audio('assets/mp3/correct.mp3');
const error = new Audio('assets/mp3/error.mp3');

const gameState = {
  index: null,
  count: 0,
  gameMode: false,
  cards: [],
  correctAnswer: 0,
  wrongAnswer: 0
};

function audioVoice(element) {
  const audio = element.querySelector('audio');
  audio.play();
}

function showWrongImg() {
  const img = document.createElement('img');
  img.src = 'assets/images/grumpy-cat.jpg';
  cardsParent.querySelectorAll('.card').forEach((card) => card.remove());
  document.body.classList.add('loseGame').append(img);
}

function chooseNextWord() {
  if (gameState.cards.length) {
    gameState.next = gameState.cards.pop();
    audioVoice(gameState.next);
  } else if (gameState.wrongAnswer) {
    showWrongImg();
  }
}

function startGameBtn() {
  if (!playInput.checked) {
    audioVoice(gameState.next);
  } else {
    playBtn.hidden = true;
    playInput.checked = false;
    playSlider.classList.add('play__active');
    play.classList.add('active');

    gameState.cards = shuffle([...document.querySelectorAll('.card__inner')]);
    chooseNextWord();
  }
}

function removeGameBtn() {
  cardsParent.classList.remove('cards__play');
  playSlider.classList.remove('play__active');
  play.classList.remove('active');
  playBtn.hidden = true;
}

function toggleGameMode() {
  if (!cardsParent.querySelector('.card')) return;

  const footer = document.querySelector('.footer');

  switcherInput.checked = !switcherInput.checked;
  gameState.gameMode = !gameState.gameMode;
  footer.hidden = !footer.hidden;
  playBtn.hidden = false;
  playInput.checked = true;

  if (gameState.gameMode) {
    cardsParent.classList.add('cards__play');
  } else {
    removeGameBtn();
  }
}

function navMenu(event) {
  const humb = document.querySelector('.humb');
  const menu = document.querySelector('.menu');
  const ul = document.querySelector('.menu__list');
  if (event.target.closest('.humb')) {
    humb.classList.toggle('humb__active');
    menu.classList.toggle('menu__active');
  } else if (event.target !== ul && event.target !== menu) {
    humb.classList.remove('humb__active');
    menu.classList.remove('menu__active');
  }
}

function showCategories() {
  cardsParent.querySelectorAll('.card').forEach((card) => card.remove());
  categoryCards.forEach((card) => card.removeAttribute('hidden'));
}

function showCategoryCards(category) {
  categoryCards.forEach((card) => card.setAttribute('hidden', ''));
  cardsParent.querySelectorAll('.card').forEach((card) => card.remove());

  const words = cardData[category];
  for (let i = 0; i < words.length; i += 1) {
    const card = new WordCard(document.querySelector('.cards'), words[i]);
    card.render();
  }
}

function handleBackRotate(event) {
  const rotatedCard = event.target.closest('.card__rotate');
  if (rotatedCard === null) {
    cardsParent.querySelector('.card__rotate').classList.remove('card__rotate');
    document.body.removeEventListener('mousemove', handleBackRotate);
  }
}

function rotate(element) {
  const card = element;
  card.classList.add('card__rotate');
  card.ontransitionend = () => {
    document.body.addEventListener('mousemove', handleBackRotate);
    card.ontransitionend = null;
  };
}

function makeGuess(card) {
  if (card === gameState.next) {
    gameState.count += 1;
    gameState.correctAnswer += 1;
    correct.play();
    chooseNextWord();
  } else {
    gameState.wrongAnswer += 1;
    error.play();
  }
}

function handleCardEvents(event) {
  if (event.target === cardsParent) return;

  const card = event.target.closest('.card__inner');
  if (event.target.closest('.category')) {
    showCategoryCards(event.target.closest('.category').id);
  } else if (event.target.alt === 'rotate') {
    rotate(card);
  } else if (card && !gameState.gameMode) {
    audioVoice(card);
  } else if (card && gameState.gameMode && !playInput.checked) {
    makeGuess(card);
  }
}

function handleMenuClick(event) {
  if (event.target.tagName === 'A') {
    const { id } = event.target.dataset;
    if (id === 'main') {
      showCategories();
    } else {
      showCategoryCards(id);
    }
  }
}

switcher.addEventListener('click', toggleGameMode);
document.body.addEventListener('click', navMenu);
cardsParent.addEventListener('click', handleCardEvents);
nav.addEventListener('click', handleMenuClick);
play.addEventListener('click', startGameBtn);
