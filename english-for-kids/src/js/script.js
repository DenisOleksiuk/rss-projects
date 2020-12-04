import {
  cardData
} from './cardData.js';
import {
  WordCard
} from './wordCard.js';

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
const win = new Audio('assets/mp3/success.mp3');
const fail = new Audio('assets/mp3/failure.mp3');

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

function wonGame() {
  document.body.classList.add('overflowHidden');
  const figure = document.querySelector('.figwin');
  const dialog = document.querySelector('.dialog-win');
  figure.hidden = false;
  win.play();
  dialog.showModal();
}

function failedGame() {
  document.body.classList.add('overflowHidden');
  const figure = document.querySelector('.figlos');
  const dialog = document.querySelector('.dialog');
  const dilAnsr = document.querySelector('.dialog__answer');
  figure.hidden = false;
  fail.play();
  dilAnsr.textContent = `Wrong answer: ${gameState.wrongAnswer}`;
  dialog.showModal();
}

function chooseNextWord() {
  if (gameState.cards.length) {
    gameState.next = gameState.cards.pop();
    audioVoice(gameState.next);
  } else if (gameState.wrongAnswer) {
    failedGame();
  } else if (!gameState.wrongAnswer) {
    wonGame();
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
  const gameStart = document.querySelector('.game__start');
  cardsParent.classList.remove('cards__play');
  playSlider.classList.remove('play__active');
  play.classList.remove('active');
  gameStart.hidden = true;
  playBtn.hidden = true;
}

function showPlayBtn() {
  const gameStart = document.querySelector('.game__start');

  if (gameState.gameMode && cardsParent.querySelector('.card')) {
    playBtn.hidden = false;
    playInput.checked = true;
    gameStart.hidden = false;
  } else if (!gameState.gameMode) {
    gameStart.hidden = true;
    playBtn.hidden = true;
  }
}

function toggleGameMode() {
  const catInner = document.querySelectorAll('.category__inner');
  const cardInner = document.querySelectorAll('.card__inner');
  switcherInput.checked = !switcherInput.checked;
  gameState.gameMode = !gameState.gameMode;
  cardsParent.classList.add('cards__play');

  showPlayBtn();
  if (!gameState.gameMode) {
    catInner.forEach((card) => card.classList.remove('category__inner-playmode'));
    cardInner.forEach((card) => card.classList.remove('card__inner-checked'));
    gameState.wrongAnswer = 0;
    removeGameBtn();
  } else {
    catInner.forEach((card) => card.classList.add('category__inner-playmode'));
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
  const stars = document.querySelector('.answers');
  const correctlyStar = document.createElement('img');
  if (card === gameState.next) {
    correctlyStar.src = './assets/images/star-win.svg';
    correctlyStar.alt = 'star';
    stars.prepend(correctlyStar);
    gameState.count += 1;
    gameState.correctAnswer += 1;
    card.classList.add('card__inner-checked');
    correct.play();
    setTimeout(() => chooseNextWord(), 500);
  } else {
    if (card.classList.contains('card__inner-checked')) {
      return;
    }
    correctlyStar.src = './assets/images/star.svg';
    correctlyStar.alt = 'star';
    stars.prepend(correctlyStar);
    gameState.wrongAnswer += 1;
    error.play();
  }
}

function handleCardEvents(event) {
  if (event.target === cardsParent) return;

  const card = event.target.closest('.card__inner');
  if (event.target.closest('.category')) {
    showCategoryCards(event.target.closest('.category').id);
    showPlayBtn();
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
    const {
      id
    } = event.target.dataset;
    if (id === 'main') {
      showCategories();
      removeGameBtn();
    } else {
      showCategoryCards(id);
      removeGameBtn();
      showPlayBtn();
      if (gameState.gameMode) {
        cardsParent.classList.add('cards__play');
      }
    }
  }
}

switcher.addEventListener('click', toggleGameMode);
document.body.addEventListener('click', navMenu);
cardsParent.addEventListener('click', handleCardEvents);
nav.addEventListener('click', handleMenuClick);
play.addEventListener('click', startGameBtn);
