import { numberWithCommas } from './renderCountryList';

function createTitle() {
  return /* html */`
    <th class="confirmed">Confirmed</th>
    <th class="deaths">Deaths</th>
    <th class="recovered">Recovered</th>
  `;
}

class BuildTable {
  constructor(country) {
    this.country = country;
  }

  render() {
    this.fullScreen = document.createElement('div');
    this.fullScreen.classList.add('full__screen-table-btn');
    this.fullScreen.innerHTML = '<img src="./assets/images/cdcover7.svg" alt="">';
    const wrraper = document.createElement('div');
    const innerWrraper = document.createElement('div');
    this.table = document.createElement('table');
    this.root = document.querySelector('#root');
    wrraper.classList.add('tableWrraper');
    innerWrraper.classList.add('inner__wrraper');
    this.table.classList.add('table');
    this.table.innerHTML = /* html */`
      <thead>
        <tr>
          <th colspan="3"><img class="table__img" src="${this.country.flag}"> <span class="title">World</span></th>
        </tr>
      </thead>
      <tbody>
        <tr data-totalConfirmed="totalConfirmed" class="total">
          <th colspan="3">Total Cases</th>
        </tr>
        <tr data-totalConfirmed="totalConfirmed" class="total titles">
        ${createTitle()}
        </tr>
        <tr data-totalConfirmed="totalConfirmed" class="total">
          <td class="total__cases confirmed">${numberWithCommas(this.country.totalConfirmed)}</td>
          <td class="total__cases deaths">${numberWithCommas(this.country.totalDeaths)}</td>
          <td class="total__cases recovered">${numberWithCommas(this.country.totalRecovered)}</td>
        </tr>
        <tr data-newConfirmed="newConfirmed" class="new" hidden>
          <th colspan="3">For the last day</th>
        </tr>
        <tr data-newConfirmed="newConfirmed" class="new" hidden>
          ${createTitle()}
        </tr>
        <tr data-newConfirmed="newConfirmed" class="new" hidden>
          <td class="last__day confirmed">${numberWithCommas(this.country.newConfirmed)}</td>
          <td class="last__day deaths">${numberWithCommas(this.country.newDeaths)}</td>
          <td class="last__day recovered">${numberWithCommas(this.country.newRecovered)}</td>
        </tr>
        <tr data-totalConfirmed100k="totalConfirmed100k" class="total100k" hidden>
          <th colspan="3">per 100k</th>
        </tr>
        <tr data-totalConfirmed100k="totalConfirmed100k" class="total100k" hidden>
          ${createTitle(this.country.TotalConfirmed100k)}
        </tr>
        <tr data-totalConfirmed100k="totalConfirmed100k" class="total100k" hidden>
          <td class="per100 confirmed">${numberWithCommas(this.country.totalConfirmed100k)}</td>
          <td class="per100 deaths">${numberWithCommas(this.country.totalDeaths100k)}</td>
          <td class="per100 recovered">${numberWithCommas(this.country.totalRecovered100k)}</td>
        </tr>
        <tr data-newConfirmed100k="newConfirmed100k" class="new100k" hidden>
          <th colspan="3">per 100k last day</th>
        </tr>
        <tr data-newConfirmed100k="newConfirmed100k" class="new100k" hidden>
          ${createTitle()}
        </tr>
        <tr data-newConfirmed100k="newConfirmed100k" class="new100k" hidden>
        <td class="per100__last-day confirmed">
          ${numberWithCommas(this.country.newConfirmed100k)}</td>
        <td class="per100__last-day deaths">
          ${numberWithCommas(this.country.newDeaths100k)}</td>
        <td class="per100__last-day recovered">
          ${numberWithCommas(this.country.newRecovered100k)}</td>
        </tr>           
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <select class="select">
              <option value="data-totalConfirmed">Total Cases</option>
              <option value="data-newConfirmed">New Cases</option>
              <option value="data-totalConfirmed100k">Total per 100k</option>
              <option value="data-newConfirmed100k">New per 100k</option>
            </select>
          </td>
        </tr> 
      </tfoot>
      `;
    this.select = this.table.querySelector('.select');
    this.title = this.table.querySelector('.title');
    this.img = this.table.querySelector('.table__img');
    this.totalCases = this.table.querySelectorAll('.total__cases');
    this.lastDay = this.table.querySelectorAll('.last__day');
    this.per100 = this.table.querySelectorAll('.per100');
    this.per100LastDay = this.table.querySelectorAll('.per100__last-day');

    innerWrraper.append(this.fullScreen, this.table);
    wrraper.append(innerWrraper);
    this.root.prepend(wrraper);
  }

  updateData(country) {
    const {
      name,
      newConfirmed,
      newDeaths,
      newRecovered,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      flag,
      newConfirmed100k,
      newDeaths100k,
      newRecovered100k,
      totalConfirmed100k,
      totalDeaths100k,
      totalRecovered100k,
    } = country;

    this.img.src = flag;
    this.title.textContent = name;

    this.totalCases[0].textContent = numberWithCommas(totalConfirmed);
    this.totalCases[1].textContent = numberWithCommas(totalDeaths);
    this.totalCases[2].textContent = numberWithCommas(totalRecovered);

    this.lastDay[0].textContent = numberWithCommas(newConfirmed);
    this.lastDay[1].textContent = numberWithCommas(newDeaths);
    this.lastDay[2].textContent = numberWithCommas(newRecovered);

    this.per100[0].textContent = numberWithCommas(totalConfirmed100k);
    this.per100[1].textContent = numberWithCommas(totalDeaths100k);
    this.per100[2].textContent = numberWithCommas(totalRecovered100k);

    this.per100LastDay[0].textContent = numberWithCommas(newConfirmed100k);
    this.per100LastDay[1].textContent = numberWithCommas(newDeaths100k);
    this.per100LastDay[2].textContent = numberWithCommas(newRecovered100k);
  }

  changeIndicator(element) {
    for (let i = 0; i < element.children.length; i += 1) {
      element.children[i].setAttribute('hidden', '');
      if (element.children[i].getAttribute(this.select.value)) {
        element.children[i].removeAttribute('hidden');
      }
    }
  }
}

export { BuildTable };
