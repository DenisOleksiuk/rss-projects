import { color, Button, MouseCursorStyle } from '@amcharts/amcharts4/core';

import {
  changeButtonTotalConfirmedStatus,
  changebuttonTotalRecoveredStatus,
  changebuttonTotalDeathsStatus,
} from './config';
import { updateDataCases } from './updatetDataCases';
import { updateColorOfMap } from './updateColorOfMap';
import { renderButtonIcon } from './renderIconForButtons';

export const renderButtonsForMap = (chart, worldData) => {
  const confirmedButtonIconColor = color('#193eb4');
  const recoveredButtonIconColor = color('#72b710');
  const deathsButtonIconColor = color('#d62929');

  const buttonTotalConfirmed = chart.chartContainer.createChild(Button);
  buttonTotalConfirmed.label.text = 'Total Confirmed';
  buttonTotalConfirmed.align = 'left';
  buttonTotalConfirmed.valign = 'bottom';
  buttonTotalConfirmed.padding(5, 5, 5, 5);
  buttonTotalConfirmed.margin(0, 0, 10, 10);
  buttonTotalConfirmed.cursorOverStyle = MouseCursorStyle.pointer;
  buttonTotalConfirmed.events.on('hit', () => {
    changeButtonTotalConfirmedStatus(true);
    changebuttonTotalRecoveredStatus(false);
    changebuttonTotalDeathsStatus(false);
    updateDataCases(worldData);
    updateColorOfMap();
  });
  renderButtonIcon(buttonTotalConfirmed, confirmedButtonIconColor);

  const buttonTotalRecovered = chart.chartContainer.createChild(Button);
  buttonTotalRecovered.label.text = 'Total Recovered';
  buttonTotalRecovered.align = 'left';
  buttonTotalRecovered.valign = 'bottom';
  buttonTotalRecovered.margin(0, 0, 10, 170);
  buttonTotalRecovered.padding(5, 5, 5, 5);
  buttonTotalRecovered.cursorOverStyle = MouseCursorStyle.pointer;
  buttonTotalRecovered.events.on('hit', () => {
    changeButtonTotalConfirmedStatus(false);
    changebuttonTotalRecoveredStatus(true);
    changebuttonTotalDeathsStatus(false);
    updateDataCases(worldData);
    updateColorOfMap();
  });
  renderButtonIcon(buttonTotalRecovered, recoveredButtonIconColor);

  const buttonTotalDeaths = chart.chartContainer.createChild(Button);
  buttonTotalDeaths.label.text = 'Total Deaths';
  buttonTotalDeaths.align = 'left';
  buttonTotalDeaths.valign = 'bottom';
  buttonTotalDeaths.margin(0, 0, 10, 330);
  buttonTotalDeaths.padding(5, 5, 5, 5);
  buttonTotalDeaths.cursorOverStyle = MouseCursorStyle.pointer;
  buttonTotalDeaths.events.on('hit', () => {
    changeButtonTotalConfirmedStatus(false);
    changebuttonTotalRecoveredStatus(false);
    changebuttonTotalDeathsStatus(true);
    updateDataCases(worldData);
    updateColorOfMap();
  });
  renderButtonIcon(buttonTotalDeaths, deathsButtonIconColor);
};
