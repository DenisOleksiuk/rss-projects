import { featchCovidStats, fetchCountries } from '../fetchCovidStatsAndPopulation';
import { BuildTable } from './renderTable';
import { ContriesList } from './renderCountryList';

function calcFor100k(dividend, divisor) {
  return Math.round((dividend / divisor) * 100000);
}

function joinApiData(stats, countries) {
  const countryMap = {
    Bolivia: 'Bolivia (Plurinational State of)',
    'Cape Verde': 'Cabo Verde',
    'Congo (Brazzaville)': 'Congo',
    'Congo (Kinshasa)': 'Congo (Democratic Republic of the)',
    'Holy See (Vatican City State)': 'Holy See',
    'Iran, Islamic Republic of': 'Iran (Islamic Republic of)',
    'Korea (South)': 'Korea (Democratic People\'s Republic of)',
    'Lao PDR': 'Lao People\'s Democratic Republic',
    'Macao, SAR China': 'Macao',
    'Macedonia, Republic of': 'Macedonia (the former Yugoslav Republic of)',
    Moldova: 'Moldova (Republic of)',
    'Palestinian Territory': 'Palestine, State of',
    'Saint Vincent and Grenadines': 'Saint Vincent and the Grenadines',
    'Syrian Arab Republic (Syria)': 'Syrian Arab Republic',
    'Taiwan, Republic of China': 'Taiwan',
    'United Kingdom': 'United Kingdom of Great Britain and Northern Ireland',
    'Venezuela (Bolivarian Republic)': 'Venezuela (Bolivarian Republic of)',
  };

  const worldPopulation = 7794798739;

  const data = {
    global: {
      name: 'World',
      newConfirmed: stats.Global.NewConfirmed,
      newDeaths: stats.Global.NewDeaths,
      newRecovered: stats.Global.NewRecovered,
      totalConfirmed: stats.Global.TotalConfirmed,
      totalDeaths: stats.Global.TotalDeaths,
      totalRecovered: stats.Global.TotalRecovered,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Earth.svg',
      population: worldPopulation,
      newConfirmed100k: calcFor100k(stats.Global.NewConfirmed, worldPopulation),
      newDeaths100k: calcFor100k(stats.Global.NewDeaths, worldPopulation),
      newRecovered100k: calcFor100k(stats.Global.NewRecovered, worldPopulation),
      totalConfirmed100k: calcFor100k(stats.Global.TotalConfirmed, worldPopulation),
      totalDeaths100k: calcFor100k(stats.Global.TotalDeaths, worldPopulation),
      totalRecovered100k: calcFor100k(stats.Global.TotalRecovered, worldPopulation),
    },
    countries: stats.Countries.map(({
      Country, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered,
    }) => {
      const { flag, population } = countries.find((country) => country.name === (countryMap[Country] || Country));
      return {
        name: Country,
        newConfirmed: NewConfirmed,
        newDeaths: NewDeaths,
        newRecovered: NewRecovered,
        totalConfirmed: TotalConfirmed,
        totalDeaths: TotalDeaths,
        totalRecovered: TotalRecovered,
        flag,
        population,
        newConfirmed100k: calcFor100k(NewConfirmed, population),
        newDeaths100k: calcFor100k(NewDeaths, population),
        newRecovered100k: calcFor100k(NewRecovered, population),
        totalConfirmed100k: calcFor100k(TotalConfirmed, population),
        totalDeaths100k: calcFor100k(TotalDeaths, population),
        totalRecovered100k: calcFor100k(TotalRecovered, population),
      };
    }),
  };

  return data;
}

async function tables() {
  const [stats, countries] = [...await Promise.all([featchCovidStats(), fetchCountries()])];

  if (!stats || !countries) return;

  const data = joinApiData(stats, countries);
  const dataTable = new BuildTable(data.global);
  const countriesTable = new ContriesList(data);
  dataTable.render();
  countriesTable.render();

  const updateStyleElement = (li) => {
    document.querySelectorAll('.country').forEach((item) => item.classList.remove('active'));
    li.classList.add('active');
  };

  const updateTableStats = (element) => {
    updateStyleElement(element);
    const { name } = element.dataset;
    const subj = name === 'World' ? data.global : data.countries.find((country) => country.name === name);
    dataTable.updateData(subj);
  };

  const countriesList = document.querySelector('.countries__list');
  const select = document.querySelector('.select');
  const countriesBtn = document.querySelector('.full__screen-countries-btn');
  const countriesWrraper = document.querySelector('.countries');
  const tableBtn = document.querySelector('.full__screen-table-btn');
  const tableWrraper = document.querySelector('.inner__wrraper');
  const tbody = document.getElementsByTagName('tbody')[0];
  let selectValue = select.value;

  const inFullScreenCountries = () => {
    const ul = countriesWrraper.querySelector('.countries__list');
    countriesWrraper.classList.toggle('full__screen');
    ul.classList.toggle('ul__full-screen');
  };

  const inFullScreenTable = () => {
    const table = tableWrraper.querySelector('.table');
    tableWrraper.classList.toggle('inner__wrraper-FS');
    tableWrraper.classList.toggle('full__screen');
    table.classList.toggle('full__screen');
  };

  countriesList.addEventListener('click', (event) => {
    if (event.target === countriesList) return;
    const item = event.target.closest('.country');
    updateTableStats(item);
  });

  select.addEventListener('click', (event) => {
    if (event.target.value === selectValue) return;
    dataTable.changeIndicator(tbody);
    selectValue = select.value;
    countriesTable.updateData(selectValue.split('data-').join(''));
  });

  tableBtn.addEventListener('click', inFullScreenTable);
  countriesBtn.addEventListener('click', inFullScreenCountries);
}

export { tables };
