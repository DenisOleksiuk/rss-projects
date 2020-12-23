import {
  polygonSeries, isButtonTotalConfirmedStatus,
  isbuttonTotalRecoveredStatus,
} from './config';

const updateColorOfMap = () => {
  if (isButtonTotalConfirmedStatus()) {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#aec1ff'),
      max: am4core.color('#011a6b'),
      logarithmic: true,
    });
  } else if (isbuttonTotalRecoveredStatus()) {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#caff96'),
      max: am4core.color('#244800'),
      logarithmic: true,
    });
  } else {
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#ff9696'),
      max: am4core.color('#700b00'),
      logarithmic: true,
    });
  }
};

export default updateColorOfMap;
