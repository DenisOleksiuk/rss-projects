export const chart = am4core.create('global-map', am4maps.MapChart);
export const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
export const cases = [];
export let buttonTotalConfirmedStatus = true;
export let buttonTotalRecoveredStatus = false;
export let buttonTotalDeathsStatus = false;

export const changeButtonTotalConfirmedStatus = (state) => {
  buttonTotalConfirmedStatus = state;
  return buttonTotalConfirmedStatus;
};
export const changebuttonTotalRecoveredStatus = (state) => {
  buttonTotalRecoveredStatus = state;
  return buttonTotalRecoveredStatus;
};
export const changebuttonTotalDeathsStatus = (state) => {
  buttonTotalDeathsStatus = state;
  return buttonTotalDeathsStatus;
};

export const isButtonTotalConfirmedStatus = () => buttonTotalConfirmedStatus;

export const isbuttonTotalRecoveredStatus = () => buttonTotalRecoveredStatus;

export const isbuttonTotalDeathsStatus = () => buttonTotalDeathsStatus;
