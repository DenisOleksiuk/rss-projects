function numberWithCommas(str) {
  return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class ContriesList {
  constructor(data) {
    this.data = data;
  }

  render() {
    this.parent = document.querySelector('.tableWrraper');
    this.wrraper = document.createElement('div');
    this.fullScreen = document.createElement('div');
    this.input = document.createElement('input');
    this.input.type = 'search';
    this.ul = document.createElement('ul');
    this.wrraper.classList.add('countries');
    this.fullScreen.classList.add('full__screen-countries-btn');
    this.fullScreen.innerHTML = '<img src="./assets/images/cdcover7.svg" alt="">';
    this.input.classList.add('search__input');
    this.ul.classList.add('countries__list');
    this.updateData();
    this.wrraper.append(this.fullScreen, this.input);
    this.wrraper.append(this.ul);
    this.parent.append(this.wrraper);
    this.search();
    this.sortList();
  }

  search() {
    this.input.addEventListener('input', this.updateData.bind(this));
  }

  updateData(indicator = 'totalConfirmed') {
    this.ul.innerHTML = '';
    Object.values(this.sortList(indicator)).flat()
      .filter((country) => country.name.toLowerCase().includes(this.input.value.toLowerCase()))
      .forEach((country) => {
        const li = document.createElement('li');
        li.dataset.name = country.name;
        const countryFlag = document.createElement('img');
        const countryName = document.createElement('h3');
        const countryInfo = document.createElement('div');
        const countryPopulation = document.createElement('div');
        const countryPopulationText = document.createElement('div');
        li.classList.add('country');
        countryFlag.classList.add('country__flag');
        countryName.classList.add('country__name');
        countryInfo.classList.add('country__info');
        countryPopulation.classList.add('country__population');
        countryPopulationText.classList.add('country__population--text');

        countryFlag.src = country.flag;
        countryName.innerText = country.name;
        countryPopulation.innerText = numberWithCommas(country.population);
        countryPopulationText.innerText = 'Population';
        countryInfo.append(countryPopulation, countryPopulationText);
        li.append(countryFlag, countryName, countryInfo);
        this.sortList(li);
        this.ul.append(li);
      });
  }

  sortList(significative) {
    return Object.values(this.data).flat().sort((a, b) => b[significative] - a[significative]);
  }
}

export { ContriesList, numberWithCommas };
