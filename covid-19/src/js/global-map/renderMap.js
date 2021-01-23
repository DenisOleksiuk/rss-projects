import { useTheme, color } from '@amcharts/amcharts4/core';
import { projections } from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import { chart, polygonSeries } from './config';
import { featchCovidStats } from '../fetchCovidStatsAndPopulation';
import { updateDataCases } from './updatetDataCases';
import { renderDateForMap } from './renderDateForMap';
import { renderButtonsForMap } from './renderButtonsFromMap';
import { renderHeatLegendForMap } from './renderHeatLegendForMap';
import { renderFullScreenButton } from './renderFullScreenButton';
import { updateColorOfMap } from './updateColorOfMap';
import { addHitEvents } from './hitEvents';

export const renderMap = async () => {
  const fetchedData = await featchCovidStats();

  if (!fetchedData) return;

  const worldData = fetchedData.Countries;
  const date = fetchedData.Date;

  useTheme(am4themesAnimated);
  chart.geodata = am4geodataWorldLow;
  chart.projection = new projections.Miller();
  polygonSeries.useGeodata = true;

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = '{name}: {value}';
  polygonTemplate.propertyFields.id = 'name';
  polygonTemplate.fill = color('#3b3b3b');
  polygonTemplate.fillOpacity = 1;
  polygonTemplate.stroke = color('#ffffff');
  polygonTemplate.strokeOpacity = 0.25;

  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = color('#dbdbdb');
  polygonSeries.exclude = ['AQ'];

  renderFullScreenButton();

  updateDataCases(worldData);
  updateColorOfMap();
  addHitEvents(polygonSeries);
  renderButtonsForMap(chart, worldData);
  renderHeatLegendForMap(polygonSeries, chart);
  renderDateForMap(chart, date);
};
