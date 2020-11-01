/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import TextArea from './textarea.js';
import en from './language/en.js';
import ru from './language/ru.js';
import shiftEng from './language/shiftEng.js';
import shiftRus from './language/shiftRus.js';

const Keyboard = {
  elements: {
    arrows: null,
    keysContainer: null,
    keys: null,
  },

  regexp: /Shiftl|Shiftr|Caps lock|Enter|Alt|Backspace|Tab|Audio|Voice|Alt|Space|Hidden|En|Ru/g,

  eventHandler: {
    oninput: null,
  },

  properties: {
    capsLock: false,
    shiftL: false,
    shiftR: false,
    lang: en,
    audio: false,
    voice: false,
  },

  textArea: new TextArea('output'),

  init() {
    // Create container elements
    this.elements.keysContainer = document.createElement('div');

    // Setup arrow elements
    this.elements.keysContainer.classList.add('keyboard');
    this.elements.keysContainer.id = 'keyboard';
    this.elements.keysContainer.appendChild(this.createKeys(en));
    this.elements.keysContainer.appendChild(this.createArrows());

    // Add to DOM
    document.body.appendChild(this.elements.keysContainer);
    this.moveArrow();

    this.textArea.output.addEventListener('focus', () => this.show());
  },

  createKeys(keyLayout) {
    const fragment = document.createDocumentFragment();
    keyLayout.forEach((key) => {
      const keyContainer = document.createElement('div');
      const word = document.createElement('div');

      // Add attributes/classes
      keyContainer.classList.add('key');

      switch (key) {
        case 'Backspace':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'delete';
          keyContainer.textContent = 'Backspace';

          keyContainer.addEventListener('click', () => {
            this.textArea.deleteChar(this.textArea.currentPosition);
            this.textArea.output.focus();
          });
          break;

        case 'Tab':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'tab';
          keyContainer.textContent = 'Tab';
          keyContainer.addEventListener('click', () => {
            this.textArea.addCharacter('\t');
          });
          break;

        case 'Caps lock':
          keyContainer.classList.add('key');
          keyContainer.classList.add('smallfont');
          keyContainer.id = 'caps';
          keyContainer.textContent = 'Caps lock';
          if (this.properties.capsLock) {
            keyContainer.classList.add('caps-active');
          }
          keyContainer.addEventListener('click', () => {
            this.properties.capsLock = !this.properties.capsLock;
            this.toggleCapsLock();
            this.textArea.output.focus();
          });
          break;

        case 'Enter':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'enter';
          keyContainer.textContent = 'Enter';

          keyContainer.addEventListener('click', () => {
            this.textArea.addCharacter('\n');
          });
          break;

        case 'Shiftl':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'shiftl';
          keyContainer.textContent = 'Shift';
          if (this.properties.shiftL) {
            keyContainer.classList.add('shiftl-active');
          }
          keyContainer.addEventListener('click', () => {
            this.properties.shiftL = !this.properties.shiftL;
            this.toggleShift(this.properties.shiftL);
            this.textArea.output.focus();
            // console.log(this.properties.shiftL);
            // console.log(this.properties.capsLock);
            if (this.properties.capsLock && this.properties.shiftL) {
              this.properties.capsLock = !this.properties.capsLock;
              this.properties.shiftL = !this.properties.shiftL;
              this.toggleCapsLock();
            }
          });
          break;

        case 'Shiftr':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'shiftr';
          keyContainer.textContent = 'Shift';
          if (this.properties.shiftR) {
            keyContainer.classList.add('shiftr-active');
          }
          keyContainer.addEventListener('click', () => {
            this.properties.shiftR = !this.properties.shiftR;
            this.toggleShift(this.properties.shiftR);
            this.textArea.output.focus();
            if (this.properties.capsLock && this.properties.shiftL) {
              this.properties.capsLock = !this.properties.capsLock;
              this.properties.shiftL = !this.properties.shiftL;
              this.toggleCapsLock();
            }
          });
          break;

        case 'En':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'language';
          keyContainer.textContent = 'En';
          keyContainer.addEventListener('click', () => {
            this.elements.keysContainer.innerHTML = '';
            this.elements.keysContainer.appendChild(this.createKeys(ru));
            this.elements.keysContainer.appendChild(this.createArrows());
            document.body.appendChild(this.elements.keysContainer);
            this.moveArrow();
            this.properties.lang = ru;
          });
          break;

        case 'Ru':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'language';
          keyContainer.textContent = 'Ru';
          keyContainer.addEventListener('click', () => {
            this.elements.keysContainer.innerHTML = '';
            this.elements.keysContainer.appendChild(this.createKeys(en));
            this.elements.keysContainer.appendChild(this.createArrows());
            document.body.appendChild(this.elements.keysContainer);
            this.moveArrow();
            this.properties.lang = en;
          });
          break;

        case 'Audio':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'audio';
          keyContainer.innerHTML = '&#128266';
          keyContainer.addEventListener('click', () => {
            this.toggleAudio();
            keyContainer.classList.toggle('audio-active', this.properties.audio);
          });
          break;

        case 'Voice':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'voice';
          keyContainer.innerHTML = '&#127908';
          keyContainer.addEventListener('click', () => {
            this.toggleVoice();
            keyContainer.classList.toggle('voice-active', this.properties.voice);
          });
          break;

        case 'Alt':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'alt';
          keyContainer.textContent = 'Alt';
          break;

        case 'Space':
          keyContainer.classList.add('key');
          keyContainer.id = 'space';
          keyContainer.addEventListener('click', () => {
            this.textArea.addCharacter(' ');
          });
          break;

        case 'Hidden':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'Hidden';
          keyContainer.innerHTML = '✖';
          keyContainer.addEventListener('click', () => {
            this.hidden();
          });
          break;

        default:
          word.classList.add('char');
          word.textContent = key;
          keyContainer.addEventListener('click', () => {
            let char = '';
            // eslint-disable-next-line no-bitwise
            if (this.properties.capsLock ^ this.properties.shiftL) {
              char = key.toUpperCase();
            } else if (this.properties.capsLock
              || this.properties.shiftL || this.properties.shiftR) {
              char = key.toLowerCase();
            } else {
              char = key.toLowerCase();
            }
            this.textArea.addCharacter(char);
          });
          break;
      }
      keyContainer.appendChild(word);
      fragment.appendChild(keyContainer);
    });
    return fragment;
  },
  createArrows() {
    // reflow
    const arrows = document.createElement('div');
    const left = document.createElement('div');
    const updown = document.createElement('div');
    const down = document.createElement('div');
    const right = document.createElement('div');
    const up = document.createElement('div');
    updown.appendChild(up);
    updown.appendChild(down);
    arrows.appendChild(left);
    arrows.appendChild(updown);
    arrows.appendChild(right);
    // repaint
    left.classList.add('key');
    up.classList.add('key');
    down.classList.add('key');
    right.classList.add('key');
    arrows.id = 'arrow';
    left.id = 'horizontal';
    updown.id = 'updown';
    up.id = 'vertical';
    down.id = 'vertical';
    right.id = 'horizontal';
    left.setAttribute('data-left', '');
    right.setAttribute('data-right', '');
    left.innerHTML = '&#x2190';
    up.innerHTML = '&#x2191';
    down.innerHTML = '&#x2193';
    right.innerHTML = '&#x2192';
    return arrows;
  },

  createNewKeys(language = this.properties.lang) {
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.appendChild(this.createKeys(language));
    this.elements.keysContainer.appendChild(this.createArrows());
    document.body.appendChild(this.elements.keysContainer);
  },

  moveArrow() {
    document.querySelector('#arrow').addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-left')) {
        this.textArea.setPosition(this.textArea.currentPosition - 1);
        this.textArea.setCaretPosition(this.textArea.currentPosition);
        this.textArea.output.focus();
      }

      if (e.target.hasAttribute('data-right')) {
        this.textArea.setPosition(this.textArea.currentPosition + 1);
        this.textArea.setCaretPosition(this.textArea.currentPosition);
        this.textArea.output.focus();
      }
    });
  },

  toggleCapsLock() {
    if (this.properties.capsLock) {
      const up = [];
      for (const i of this.properties.lang) {
        if (i.match(this.regexp)) {
          up.push(i.slice(0, 1).toUpperCase() + i.slice(1).toLowerCase());
        } else {
          up.push(i.toUpperCase());
        }
      }
      this.createNewKeys(up);
    } else {
      this.createNewKeys();
    }
  },

  toggleShift(direction) {
    if (direction) {
      const shift = [];
      if (this.properties.lang === en) {
        for (const i of shiftEng) {
          if (i.match(this.regexp)) {
            shift.push(i.slice(0, 1).toUpperCase() + i.slice(1).toLowerCase());
          } else {
            shift.push(i.toUpperCase());
          }
        }
        this.createNewKeys(shift);
      } else if (this.properties.lang === ru) {
        for (const i of shiftRus) {
          if (i.match(this.regexp)) {
            shift.push(i.slice(0, 1).toUpperCase() + i.slice(1).toLowerCase());
          } else {
            shift.push(i.toUpperCase());
          }
        }
        this.createNewKeys(shift);
      } else {
        this.createNewKeys();
      }
    } else {
      this.createNewKeys();
    }
  },

  toggleAudio() {
    this.properties.audio = !this.properties.audio;
  },

  toggleVoice() {
    this.properties.voice = !this.properties.voice;
  },

  hidden() {
    this.elements.keysContainer.classList.add('hide_me');
    this.elements.keysContainer.classList.remove('show_me');
  },

  show() {
    this.elements.keysContainer.classList.add('show_me');
    this.elements.keysContainer.classList.remove('hide_me');
  },
};

window.addEventListener('DOMContentLoaded', () => Keyboard.init());
