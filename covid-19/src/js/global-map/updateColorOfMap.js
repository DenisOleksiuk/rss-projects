import { color } from '@amcharts/amcharts4/core';

import {
  polygonSeries, isButtonTotalConfirmedStatus,
  isbuttonTotalRecoveredStatus,
} from './config';

export const updateColorOfMap = () => {
  if (isButtonTotalConfirmedStatus()) {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: color('#aec1ff'),
      max: color('#011a6b'),
      logarithmic: true,
    });
  } else if (isbuttonTotalRecoveredStatus()) {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: color('#caff96'),
      max: color('#244800'),
      logarithmic: true,
    });
  } else {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: color('#ff9696'),
      max: color('#700b00'),
      logarithmic: true,
    });
  }
};
