import { chart, polygonSeries } from './config';
import { featchCovidStats } from '../fetchCovidStatsAndPopulation';
import updateDataCases from './updatetDataCases';
import renderDateForMap from './renderDateForMap';
import renderButtonsForMap from './renderButtonsFromMap';
import renderHeatLegendForMap from './renderHeatLegendForMap';
import updateColorOfMap from './updateColorOfMap';
import addHitEvents from './hitEvents';

const renderMap = async () => {
  const fetchedData = await featchCovidStats();
  const worldData = fetchedData.Countries;
  const date = fetchedData.Date;

  am4core.useTheme(am4themes_animated);
  chart.geodata = am4geodata_worldLow;
  chart.projection = new am4maps.projections.Miller();
  polygonSeries.useGeodata = true;

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = '{name}: {value}';
  polygonTemplate.propertyFields.id = 'name';
  polygonTemplate.fill = am4core.color('#3b3b3b');
  polygonTemplate.fillOpacity = 1;
  polygonTemplate.stroke = am4core.color('#ffffff');
  polygonTemplate.strokeOpacity = 0.25;

  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#dbdbdb');
  polygonSeries.exclude = ['AQ'];

  updateDataCases(worldData);
  updateColorOfMap();
  addHitEvents(polygonSeries);
  renderButtonsForMap(chart, worldData);
  renderHeatLegendForMap(polygonSeries, chart);
  renderDateForMap(chart, date);
};

export default renderMap;
