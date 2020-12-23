import { chart } from './chart';

chart();
function logicChart() {
  const randomRgba = () => {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  };

  const color = randomRgba();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const state = {
    TotalConfirmed: [],
    SumConfirmed: [],
    TotalDeaths: [],
    SumDeaths: [],
    TotalRecovered: [],
    SumRecodered: [],
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };

  // API returns data only for 250 days
  const dateArr = [];
  const getArrOfDates = () => {
    for (let i = 250; i > 1; i -= 1) {
      const today = new Date();
      dateArr.push(formatDate(today.setDate(today.getDate() - i)));
    }
  };

  getArrOfDates();

  const updateState = (data) => {
    data.map((item) => {
      state.TotalConfirmed.push(item.TotalConfirmed);
      state.SumConfirmed.push(item.TotalConfirmed.reducer);
      state.TotalDeaths.push(item.TotalDeaths);
      state.TotalRecovered.push(item.TotalRecovered);
    });
  };

  const getData = async () => {
    const url = `https://api.covid19api.com/world?from=${dateArr[0]}&to=${dateArr[dateArr.length - 1]}`;
    const response = await fetch(url);
    const data = await response.json();

    updateState(data);
  };

  getData();

  const changeChartToTotalConfirmedCases = () => {
    myChart.data.datasets[0].label = 'Total Confirmed Cases';
    myChart.data.datasets[0].data = state.TotalConfirmed;
    myChart.data.datasets[0].color = [color];
    myChart.update();
  };

  const changeChartToTotalDeathCases = () => {
    myChart.data.datasets[0].label = 'Total Death Cases';
    myChart.data.datasets[0].data = state.TotalDeaths;
    myChart.update();
  };

  const changeChartToTotalRecoveredCases = () => {
    myChart.data.datasets[0].label = 'Total Recovered Cases';
    myChart.data.datasets[0].data = state.TotalRecovered;
    myChart.update();
  };
  const createBtn = (text) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    return btn;
  };

  const parent = document.querySelector('#root');
  const wrraper = document.createElement('div');
  const innerWrraper = document.createElement('div');
  const confirmedBtn = createBtn('Total Confirmed Cases');
  const deathBtn = createBtn('Total Death Cases');
  const recoveredBtn = createBtn('Total Recovered Cases');
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  wrraper.classList.add('chart__container');
  innerWrraper.classList.add('inner__container');

  confirmedBtn.addEventListener('click', changeChartToTotalConfirmedCases);
  deathBtn.addEventListener('click', changeChartToTotalDeathCases);
  recoveredBtn.addEventListener('click', changeChartToTotalRecoveredCases);

  innerWrraper.append(confirmedBtn, deathBtn, recoveredBtn);
  wrraper.prepend(confirmedBtn, deathBtn, recoveredBtn);
  wrraper.append(canvas);
  parent.append(wrraper);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dateArr,
      datasets: [{
        label: 'New Confirmed Cases',
        data: state.NewConfirmed,
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
      }],
    },
  });
}

export { logicChart };
