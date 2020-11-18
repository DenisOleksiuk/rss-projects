/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./gem-puzzle/src/js/header.js":
/*!*************************************!*\
  !*** ./gem-puzzle/src/js/header.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction formatTime(seconds) {\n  return `${String(Math.floor(seconds / 60)).padStart(2, 0)} : ${String(seconds % 60).padStart(2, 0)}`;\n}\n\nclass Header {\n  constructor(parent) {\n    this.parent = parent;\n    this.time = 0;\n    this.step = 0;\n    this.paused = false;\n    this.audio = false;\n    this.render();\n    const { pauseBtn } = this.elements;\n    pauseBtn.onclick = () => {\n      if (this.paused) {\n        this.paused = false;\n        this.resumeTimer();\n        pauseBtn.classList.remove('paused');\n      } else {\n        this.paused = true;\n        this.pauseTimer();\n        pauseBtn.classList.add('paused');\n      }\n    };\n  }\n\n  render() {\n    this.parent.innerHTML = /* html */`\n      <header hidden>\n        <div class=\"info\">\n          <span class=\"description\">Время</span>\n          <span class=\"time\">00 : 00</span>\n        </div>\n        <div class=\"audio\">\n        <i class=\"fas fa-volume-mute\"></i>\n      </div>\n        <div class=\"muves\">\n          <span class=\"description\">Ходы </span>\n          <span class=\"counter\">0</span>\n        </div>\n        <button class=\"pause\">\n          <span>Пауза</span>\n          <span>Возобновить</span>\n        </button>\n      </header>\n    `;\n    const header = this.parent.querySelector('header');\n    const timer = header.querySelector('.time');\n    const moveCounter = header.querySelector('.counter');\n    const pauseBtn = header.querySelector('.pause');\n    const wrraper = header.querySelector('.audio');\n    this.elements = {\n      header, timer, moveCounter, pauseBtn, wrraper\n    };\n  }\n\n  show() {\n    this.elements.header.hidden = false;\n  }\n\n  hide() {\n    this.elements.header.hidden = true;\n  }\n\n  toggleAudio() {\n    this.audio = !this.audio;\n    if (this.audio) {\n      this.elements.wrraper.innerHTML = '<i class=\"fa fa-volume-up audio\"></i>';\n    } else {\n      this.elements.wrraper.innerHTML = '<i class=\"fa fa-volume-mute audio\"></i>';\n    }\n  }\n\n  showTime() {\n    return this.elements.timer.innerText;\n  }\n\n  stepCounter() {\n    this.step += 1;\n    this.elements.moveCounter.textContent = this.step;\n  }\n\n  resetHeader() {\n    this.time = 0;\n    this.step = 0;\n    this.paused = false;\n    this.elements.timer.innerText = '00 : 00';\n    this.elements.pauseBtn.classList.remove('paused');\n  }\n\n  updateTimer() {\n    this.elements.timer.innerText = formatTime(this.time);\n  }\n\n  startTimer() {\n    this.resetHeader();\n    this.resumeTimer();\n  }\n\n  pauseTimer() {\n    clearInterval(this.timer);\n  }\n\n  resumeTimer() {\n    this.timer = setInterval(() => {\n      this.time += 1;\n      this.updateTimer();\n    }, 1000);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Header(document.body));\n\n\n//# sourceURL=webpack://denisoleksiuk-js2020q3/./gem-puzzle/src/js/header.js?");

/***/ }),

/***/ "./gem-puzzle/src/js/menu.js":
/*!***********************************!*\
  !*** ./gem-puzzle/src/js/menu.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.js */ \"./gem-puzzle/src/js/header.js\");\n/* harmony import */ var _puzzle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./puzzle.js */ \"./gem-puzzle/src/js/puzzle.js\");\n;\n\n\nclass Menu {\n  render(parent) {\n    let becauseOfLinter = parent;\n    becauseOfLinter = document.querySelector('.board');\n    this.mainMenu = document.createElement('div');\n    this.mainMenu.className = 'main-menu';\n    this.mainMenu.innerHTML = /* html */ `\n      <h1 class=\"title\">Главное меню</h1>\n      <p class=\"proceed\">Продолжить игру</p>\n      <p class=\"start\">Новая игра</p>\n      <p class=\"save\">Сохранить игру</p>\n      <p class=\"score\">Лучший результат</p>\n      <p class=\"setting\">Настройки</p>\n      <p class=\"back\"></p>\n    `;\n    becauseOfLinter.append(this.mainMenu);\n\n    const menu = document.querySelector('.main-menu');\n    const title = menu.querySelector('.title');\n    const proceed = menu.querySelector('.proceed');\n    const start = menu.querySelector('.start');\n    const save = menu.querySelector('.save');\n    const score = menu.querySelector('.score');\n    const settingBtn = menu.querySelector('.setting');\n    this.elements = {\n      menu,\n      title,\n      proceed,\n      start,\n      save,\n      score,\n      settingBtn\n    };\n    this.elements.proceed.addEventListener('click', this.continue.bind(this));\n    this.elements.start.addEventListener('click', this.newGame.bind(this));\n    this.elements.settingBtn.addEventListener('click', this.createSetting.bind(this));\n  }\n\n  settingBack() {\n    const select = document.querySelector('.select-box');\n    this.value = +select.value;\n    this.pieces = this.value ** 2;\n    this.remove();\n    this.render();\n  }\n\n  createSetting() {\n    this.menu = document.querySelector('.main-menu');\n    this.menu.innerHTML = /* html */ `\n    <div class=\"setting-menu\">\n      <label class=\"change-field\">Выбрать поле: </label>\n      <select class=\"select-box\">\n        <option class=\"select-option\" value=\"3\">3x3</option>\n        <option class=\"select-option\" value=\"4\" selected=\"\">4x4</option>\n        <option class=\"select-option\" value=\"5\">5x5</option>\n        <option class=\"select-option\" value=\"6\">6x6</option>\n        <option class=\"select-option\" value=\"7\">7x7</option>\n        <option class=\"select-option\" value=\"8\">8x8</option>\n      </select>\n      <button class=\"setting-btn\" data-screen=\"main\">Назад</button>\n    </div>\n    `;\n    const btn = document.querySelector('.setting-btn');\n    btn.addEventListener('click', this.settingBack.bind(this));\n  }\n\n  show() {\n    this.elements.menu.hidden = false;\n  }\n\n  hide() {\n    if (!_header_js__WEBPACK_IMPORTED_MODULE_0__.default.elements.header.hidden) {\n      _header_js__WEBPACK_IMPORTED_MODULE_0__.default.elements.pauseBtn.classList.remove('paused');\n      _header_js__WEBPACK_IMPORTED_MODULE_0__.default.paused = false;\n      this.elements.menu.remove();\n    }\n  }\n\n  pauseGame() {\n    const pause = document.querySelector('.pause');\n    if (pause.classList.contains('paused')) {\n      this.render();\n    } else {\n      this.remove();\n    }\n  }\n\n  continue() {\n    _header_js__WEBPACK_IMPORTED_MODULE_0__.default.resumeTimer();\n    this.hide();\n  }\n\n  // eslint-disable-next-line class-methods-use-this\n  newGame() {\n    _header_js__WEBPACK_IMPORTED_MODULE_0__.default.show();\n    _header_js__WEBPACK_IMPORTED_MODULE_0__.default.startTimer();\n    const board = document.querySelector('.board');\n    if (board) board.remove();\n    const puzzle = new _puzzle_js__WEBPACK_IMPORTED_MODULE_1__.default(this.value);\n    puzzle.render(document.body);\n    this.elements.start.addEventListener('click', this.newGame.bind(this));\n  }\n\n  remove() {\n    this.mainMenu.remove();\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);\n\n\n//# sourceURL=webpack://denisoleksiuk-js2020q3/./gem-puzzle/src/js/menu.js?");

/***/ }),

/***/ "./gem-puzzle/src/js/puzzle.js":
/*!*************************************!*\
  !*** ./gem-puzzle/src/js/puzzle.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.js */ \"./gem-puzzle/src/js/header.js\");\n;\n\nfunction generateShuffledRange(maxNum) {\n  const gemPieces = [];\n  for (let i = 1; i <= maxNum; i += 1) gemPieces.push(i);\n  for (let i = gemPieces.length - 1; i > 0; i -= 1) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [gemPieces[i], gemPieces[j]] = [gemPieces[j], gemPieces[i]];\n  }\n  return gemPieces;\n}\n\nclass Puzzle {\n  constructor(size = 4) {\n    this.boardSize = size;\n    this.gemCount = this.boardSize ** 2 - 1;\n    this.widthBoard = 400;\n  }\n\n  render(parent) {\n    if (document.documentElement.clientWidth < 500) this.widthBoard = 300;\n    this.gems = this.solve();\n    this.board = document.createElement('div');\n    this.board.className = 'board';\n    this.board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;\n    this.widthAndHeightChips = this.widthBoard / this.boardSize;\n    this.board.style.setProperty('--chipSize', `${this.widthAndHeightChips - 4}px`);\n    parent.append(this.board);\n    this.board.append(this.createGems(this.gems));\n    this.movePuzzle();\n  }\n\n  createGems(arr) {\n    this.fragment = document.createDocumentFragment();\n    arr.forEach((el, i) => {\n      // 3 it is padding\n      const chip = document.createElement('div');\n      const top = this.widthAndHeightChips * Math.trunc((i / this.boardSize)) + 2;\n      const left = this.widthAndHeightChips * (i % this.boardSize) + 2;\n      chip.style.top = `${top}px`;\n      chip.style.left = `${left}px`;\n      // find the row and colm gems for the position img\n      let xImg = Math.floor((el % this.boardSize) - 1) * this.widthAndHeightChips;\n      let yImg = Math.ceil(el / this.boardSize - 1) * this.widthAndHeightChips;\n      if (el) {\n        chip.classList.add('chip');\n        chip.style.backgroundPosition = `${-xImg}px ${-yImg}px`;\n        chip.id = el;\n        chip.textContent = el;\n      } else {\n        chip.classList.add('empty');\n        chip.id = 0;\n      }\n      this.fragment.appendChild(chip);\n    });\n    return this.fragment;\n  }\n\n  movePuzzle() {\n    const chips = document.querySelectorAll('.chip');\n    const zero = document.querySelector('.empty');\n    chips.forEach((el) => {\n      const elem = el;\n\n      const mouseDown = (eventDown) => {\n        elem.classList.add('move');\n        const whereLeft = elem.style.left;\n        const whereTop = elem.style.top;\n        elem.style.zIndex = 44;\n        const parentTop = this.board.getBoundingClientRect().y;\n        const parentLeft = this.board.getBoundingClientRect().x;\n        let shiftX = eventDown.clientX - elem.getBoundingClientRect().left;\n        let shiftY = eventDown.clientY - elem.getBoundingClientRect().top;\n        const leftDiff = Math.abs(\n          Math.trunc(parseFloat(zero.style.left) - parseFloat(elem.style.left))\n        );\n        const topDiff = Math.abs(\n          Math.trunc(parseFloat(zero.style.top) - parseFloat(elem.style.top))\n        );\n\n        function moveAt(pageX, pageY) {\n          elem.style.left = pageX - shiftX - parentLeft + 'px';\n          elem.style.top = pageY - shiftY - parentTop + 'px';\n        }\n        moveAt(eventDown.pageX, eventDown.pageY);\n\n        const mouseMove = (event) => {\n          moveAt(event.pageX, event.pageY);\n          elem.ondragstart = () => {\n            return false;\n          };\n        };\n        document.addEventListener('mousemove', mouseMove);\n\n        const mouseUp = (eventUp) => {\n          elem.style.zIndex = 1;\n          elem.classList.remove('move');\n          document.removeEventListener('mousemove', mouseMove);\n          if (leftDiff + topDiff === this.checkDifference()) {\n            elem.style.left = zero.style.left;\n            elem.style.top = zero.style.top;\n            [zero.style.left, zero.style.top] = [whereLeft, whereTop];\n            const empty = this.gems.indexOf(0);\n            const moving = this.gems.indexOf(+eventUp.target.id);\n            this.gems[empty] = this.gems[moving];\n            this.gems[moving] = 0;\n            _header_js__WEBPACK_IMPORTED_MODULE_0__.default.stepCounter();\n            const audio = new Audio('./assets/gem.wav');\n            if (_header_js__WEBPACK_IMPORTED_MODULE_0__.default.audio) audio.play();\n            const winPos = [...this.gems].sort((a, b) => a - b);\n            winPos.shift(0);\n            winPos.push(0);\n            if (JSON.stringify(this.gems) === JSON.stringify(winPos)) {\n              const victory = new Audio('./assets/win.wav');\n              victory.play();\n              alert(`Ура! Вы решили головоломку за ${_header_js__WEBPACK_IMPORTED_MODULE_0__.default.elements.timer.textContent} секунд, и ${_header_js__WEBPACK_IMPORTED_MODULE_0__.default.elements.moveCounter.textContent} ходов`);\n              this.board.innerHTML = '';\n              this.board.append(this.createGems(this.gems));\n              this.gems = this.solve();\n              _header_js__WEBPACK_IMPORTED_MODULE_0__.default.resetHeader();\n            }\n          } else {\n            elem.style.left = whereLeft;\n            elem.style.top = whereTop;\n          }\n          elem.removeEventListener('mouseup', mouseUp);\n        };\n        elem.addEventListener('mouseup', mouseUp);\n      };\n      elem.addEventListener('mousedown', mouseDown);\n    });\n  }\n\n  checkDifference() {\n    return Math.trunc(this.widthBoard / this.boardSize);\n  }\n\n  solve() {\n    const array = generateShuffledRange(this.gemCount);\n    let k = 0;\n    for (let i = 0; i < array.length; i += 1) {\n      for (let j = 0; j < i; j += 1) {\n        if (array[j] > array[i]) {\n          k += 1;\n        }\n      }\n    }\n    if (k % 2 !== 0) {\n      return this.solve();\n    }\n    array.push(0);\n    return array;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Puzzle);\n\n\n//# sourceURL=webpack://denisoleksiuk-js2020q3/./gem-puzzle/src/js/puzzle.js?");

/***/ }),

/***/ "./gem-puzzle/src/js/script.js":
/*!*************************************!*\
  !*** ./gem-puzzle/src/js/script.js ***!
  \*************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.js */ \"./gem-puzzle/src/js/header.js\");\n/* harmony import */ var _puzzle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./puzzle.js */ \"./gem-puzzle/src/js/puzzle.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.js */ \"./gem-puzzle/src/js/menu.js\");\n;\n\n\nconst puzzle = new _puzzle_js__WEBPACK_IMPORTED_MODULE_1__.default();\nconst menu = new _menu_js__WEBPACK_IMPORTED_MODULE_2__.default();\npuzzle.render(document.body);\nmenu.render(document.querySelector('.board'));\n\nconst audioBtn = document.querySelector('.audio');\nconst pauseBtn = document.querySelector('.pause');\n\nfunction audio() {\n  _header_js__WEBPACK_IMPORTED_MODULE_0__.default.toggleAudio();\n}\n\npauseBtn.addEventListener('click', menu.pauseGame.bind(menu));\naudioBtn.addEventListener('click', audio);\n\n\n//# sourceURL=webpack://denisoleksiuk-js2020q3/./gem-puzzle/src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./gem-puzzle/src/js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;