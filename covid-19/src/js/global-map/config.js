import { create } from '@amcharts/amcharts4/core';
import { MapChart, MapPolygonSeries } from '@amcharts/amcharts4/maps';

export const chart = create('global-map__wrapper', MapChart);
export const polygonSeries = chart.series.push(new MapPolygonSeries());
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
