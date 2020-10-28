// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('#name'),
    focus = document.querySelector('.focus'),
    btn = document.querySelector('.btn'),
    weather = document.querySelector('.weather'),
    weatherIcon = weather.querySelector(".weather-icon"),
    city = weather.querySelector('.weather-city'),
    temperature = weather.querySelector('.temperature'),
    humidity = weather.querySelector('.weather-humidity'),
    wind = weather.querySelector('.weather-wind'),
    weatherDescription = weather.querySelector('.weather-description'),
    weatherError = weather.querySelector('.weather-error'),
    quote = document.querySelector('.quote'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    btnQuote = document.querySelector('.btn-quote');


  const quantityImage = 21;
  const greet = ["Доброй ночи", "Доброе утро", "Добный день", "Добрый вечер"];
  const folders = ['night', 'morning', 'day', 'evening'];
  let isHour = new Date().getHours();
  let folder = '';
  let partOfDays = (isHour - isHour % 6) / 6;
  let counterImages = isHour + 1;

  // images function block {
  function pathOfPictures(folder, i) {
    if (i.length >= 3) i = i.slice(1)

    return `assets/images/${folder}/${i}.jpg`
  }

  //Change bg images
  function viewBgImage(src) {
    const body = document.querySelector('body');
    const img = document.createElement('img');
    img.src = src;
    body.style.backgroundImage = `url(${src})`;
    img.onload = () => body.style.backgroundImage = `url(${src})`;
  }
  
  //Get Images
  function getImage() {
    const index = isHour % quantityImage || 1;
    viewBgImage(pathOfPictures(folder, `0${index}`));
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 1000)
  }

  //function use only for btn
  function changeImages() {
    counterImages++;
    if (counterImages % quantityImage === 0) counterImages++
    const index = counterImages % quantityImage;
    viewBgImage(pathOfPictures(folder, `0${index}`));
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 1000);
  }

  // Update Time
  function updateTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
    // Output Time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    //Get folder
    folder = folders[(hour - hour % 6) / 6];
    if (isHour !== hour) {
      isHour = hour;
      partOfDays = (hour - hour % 6) / 6;
      greeting.textContent = `${greet[partOfDays]}, `;
      getImage()
    }

    setTimeout(updateTime, 1000);
  }

  // Add Zeros
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  //Show date
  function showDate() {
    const today = new Date();
    const formatter = today.toLocaleDateString('ru', {
      month: "long",
      weekday: "long",
      day: "numeric"
    });

    date.innerText = `${formatter}`;
  }

  // Get Name
  function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name').trim() === '') {
      name.classList.add(name.id + '-noname')
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }

  // Get Focus
  function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus').trim() === '') {
      focus.textContent = '';
      focus.className = 'focus-noname'
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }

  // Set Background and Greeting
  function setBgGreet() {
    let today = new Date(),
      hour = today.getHours();
    getImage()

    if (hour < 12 && hour >= 6) {
      // Morning
      greeting.textContent = `${greet[partOfDays]}, `;
      document.body.style.color = 'aliceblue';
    } else if (hour < 18 && hour >= 12) {
      // Afternoon
      greeting.textContent = `${greet[partOfDays]}, `;
    } else if (hour < 24 && hour >= 18) {
      // Evening;
      greeting.textContent = `${greet[partOfDays]}, `;
      document.body.style.color = 'white';
    } else if (hour < 6) {
      //night
      greeting.textContent = `${greet[partOfDays]}, `;
      document.body.style.color = 'white';
    }
  }

  // Set Name
  function setName(e) {
    if (e.which == 13 || e.keyCode == 13 || e.type == 'blur') {
      if (name.textContent === '' || name.textContent === ' ') {
        name.textContent = localStorage.getItem('name').trim();
        localStorage.setItem('name', e.target.innerText);
      }
      localStorage.setItem('name', e.target.innerText);
      name.blur();
      if (localStorage.getItem('name') !== '') {
        name.className = 'name'
      } else {
        name.className = 'name-noname'
      }
    }
  }

  // Set Focus
  function setFocus(e) {
    if (e.which == 13 || e.keyCode == 13 || e.type == 'blur') {
      if (focus.textContent === '' || focus.textContent === ' ') {
        focus.textContent = localStorage.getItem('focus');
        localStorage.setItem('focus', e.target.innerText);
      }
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();

      if (localStorage.getItem('focus') !== '') {
        focus.className = ''
      } else {
        focus.className = 'focus-noname'
      }
    }
  }

  function setCity(e) {
    if (e.which == 13 || e.keyCode == 13 || e.type == 'blur') {
      if (city.textContent === '' || city.textContent === ' ') {
        city.textContent = localStorage.getItem('city').trim();
        localStorage.setItem('city', e.target.innerText);
      }
      localStorage.setItem('city', e.target.innerText);
      city.blur();
      if (localStorage.getItem('city') !== '') {
        city.className = 'weather-city'
      } else {
        city.className = 'city-noname'
      }
    }
    if (e.which == 13 || e.keyCode == 13 || e.type == 'blur') {
      city.blur();
      getWeather();
    }
  }

  function clickFeiled(e) {
    const thisElem = e.target;
    if (thisElem.id === 'name' || thisElem.id === 'focus' || thisElem.id === 'city') {
      thisElem.textContent = '';
      thisElem.classList.add(thisElem.className = thisElem.className + '-noname')
    }
  }

  async function getWeather() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=8bfd204ac510093e17953ae4918b917f&units=metric`;
      const response = await fetch(url);
      if (response.status === 429) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=adbeadb10fbaf3cbb586b63cfc14b392&units=metric`;
        getWeather();
      }
      const data = await response.json();
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      humidity.textContent = `${data.main.humidity}% влажность`;
      wind.textContent = `${data.wind.speed} м/с`;
      weatherDescription.textContent = data.weather[0].description;
      temperature.style.opacity = 1;
      humidity.style.opacity = 1;
      wind.style.opacity = 1;
      weatherDescription.style.opacity = 1;
      weatherError.style.opacity = 0;
    } catch (err) {
      console.log(err);
      temperature.style.opacity = 0;
      humidity.style.opacity = 0;
      wind.style.opacity = 0;
      weatherDescription.style.opacity = 0;
      weatherError.style.opacity = 1;
    } 
  }
  

// 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/';
// , {
//   "headers": {
//     "content-type": "application/x-www-form-urlencoded"
//   },
//   "body": "method=getQuote&format=json&key=&lang=ru",
//   "method": "POST"
// }
//'https://quotes-cors.herokuapp.com/';

  async function getQuote() {
    try {
      const url = 'https://quotes-cors.herokuapp.com/';
      const res = await fetch(url);
      const data = await res.json()
      setTimeout(() => {
        quote.style.opacity = 1;
        blockquote.textContent = data.quoteText;
        figcaption.textContent = data.quoteAuthor
      }, 1000);

    } catch {err} {

    }
  }


  function opacity() {
    setTimeout(() => quote.style.opacity = 0)
    getQuote()
  }

  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName);
  name.addEventListener('click', clickFeiled);
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus);
  focus.addEventListener('click', clickFeiled);
  city.addEventListener('keypress', setCity);
  city.addEventListener('blur', setCity);
  city.addEventListener('click', clickFeiled);
  btn.addEventListener('click', changeImages);
  btnQuote.addEventListener('click', opacity)

  // Run
  updateTime();
  showDate();
  setBgGreet();
  getName();
  getFocus();
  getWeather();
  getQuote();
});