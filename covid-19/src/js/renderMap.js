import { featchCovidStats } from './fetchCovidStatsAndPopulation';

const renderMap = async () => {
  const fetchedData = await featchCovidStats();
  const worldData = await fetchedData.Countries;
  const date = await fetchedData.Date;
  const cases = [];
  const confirmedButtonIconColor = am4core.color('#193eb4');
  const recoveredButtonIconColor = am4core.color('#72b710');
  const deathsButtonIconColor = am4core.color('#d62929');

  // Theme
  am4core.useTheme(am4themes_animated);

  // Create map instanc
  const chart = am4core.create('global-map', am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  // polygonTemplate.tooltipText = '{name}: {totalConfirmed}';
  polygonTemplate.tooltipText = '{name}: {value}';
  polygonTemplate.fill = am4core.color('#3b3b3b');
  polygonTemplate.fillOpacity = 1;
  polygonTemplate.stroke = am4core.color('#ffffff');
  polygonTemplate.strokeOpacity = 0.25;

  // Create hover state and set alternative fill color
  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#dbdbdb');

  // Remove Antarctica
  polygonSeries.exclude = ['AQ'];

  worldData.forEach((country) => {
    // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed });
    cases.push({ id: country.CountryCode, value: country.TotalConfirmed || 1 });
  });
  polygonSeries.data = cases;

  polygonSeries.heatRules.push({
    property: 'fill',
    target: polygonSeries.mapPolygons.template,
    // min: chart.colors.getIndex(1).brighten(1),
    // max: chart.colors.getIndex(1).brighten(-0.5),
    min: am4core.color('#aec1ff'),
    max: am4core.color('#011a6b'),
    logarithmic: true,
  });

  // Add Buttons
  const buttonTotalConfirmed = chart.chartContainer.createChild(am4core.Button);
  buttonTotalConfirmed.label.text = 'Total Confirmed';
  buttonTotalConfirmed.align = 'left';
  buttonTotalConfirmed.valign = 'bottom';
  buttonTotalConfirmed.padding(5, 5, 5, 5);
  buttonTotalConfirmed.margin(0, 0, 10, 10);
  buttonTotalConfirmed.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalConfirmed.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed || 0 });
      cases.push({ id: country.CountryCode, value: country.TotalConfirmed || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#aec1ff'),
      max: am4core.color('#011a6b'),
      logarithmic: true,
    });
  });

  const buttonTotalRecovered = chart.chartContainer.createChild(am4core.Button);
  buttonTotalRecovered.label.text = 'Total Recovered';
  buttonTotalRecovered.align = 'left';
  buttonTotalRecovered.valign = 'bottom';
  buttonTotalRecovered.margin(0, 0, 10, 170);
  buttonTotalRecovered.padding(5, 5, 5, 5);
  buttonTotalRecovered.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalRecovered.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalRecovered || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#caff96'),
      max: am4core.color('#244800'),
      logarithmic: true,
    });
  });

  const buttonTotalDeaths = chart.chartContainer.createChild(am4core.Button);
  buttonTotalDeaths.label.text = 'Total Deaths';
  buttonTotalDeaths.align = 'left';
  buttonTotalDeaths.valign = 'bottom';
  buttonTotalDeaths.margin(0, 0, 10, 330);
  buttonTotalDeaths.padding(5, 5, 5, 5);
  buttonTotalDeaths.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalDeaths.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalDeaths || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#ff9696'),
      max: am4core.color('#700b00'),
      logarithmic: true,
    });
  });

  const renderButtonIcon = (button, color) => {
    const icon = new am4core.Rectangle();
    // circle.radius = 1;
    icon.width = 20;
    icon.height = 20;
    // circle.fillOpacity = 0.3;
    icon.fill = color;
    // circle.strokeOpacity = 0;
    // circle.valign = 'middle';
    icon.marginRight = 5;
    button.icon = icon;
  };
  renderButtonIcon(buttonTotalConfirmed, confirmedButtonIconColor);
  renderButtonIcon(buttonTotalRecovered, recoveredButtonIconColor);
  renderButtonIcon(buttonTotalDeaths, deathsButtonIconColor);

  // ШКАЛА
  const heatLegend = chart.createChild(am4maps.HeatLegend);
  heatLegend.background.fill = am4core.color('#ffffff');
  heatLegend.background.fillOpacity = 0.30;
  heatLegend.padding(10, 5, 10, 70);
  heatLegend.series = polygonSeries;
  heatLegend.align = 'right';
  heatLegend.valign = 'bottom';
  // heatLegend.height = am4core.percent(80);
  heatLegend.height = am4core.percent(80);
  heatLegend.orientation = 'vertical';
  heatLegend.valign = 'middle';
  heatLegend.marginRight = am4core.percent(1);
  heatLegend.valueAxis.renderer.opposite = true;
  heatLegend.valueAxis.renderer.dx = -25;
  // heatLegend.valueAxis.strictMinMax = false;
  heatLegend.valueAxis.fontSize = 11;
  // heatLegend.valueAxis.fill = am4core.color('#ffffff');
  heatLegend.valueAxis.logarithmic = true;

  const handleHover = (column) => {
    if ((column.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
    } else {
      heatLegend.valueAxis.hideTooltip();
    }
  };

  // heat legend behavior
  polygonSeries.mapPolygons.template.events.on('over', (event) => {
    handleHover(event.target);
  });

  polygonSeries.mapPolygons.template.events.on('hit', (event) => {
    handleHover(event.target);
  });

  polygonSeries.mapPolygons.template.events.on('out', () => {
    heatLegend.valueAxis.hideTooltip();
  });

  polygonSeries.mapPolygons.template.events.on('out', () => {
    heatLegend.valueAxis.hideTooltip();
  });

  // top title
  const title = chart.titles.create();
  // title.fontSize = '1.5em';
  title.fontSize = 14;
  title.fill = am4core.color('#ffffff');
  title.text = `World, ${date.slice(0, 10)}`;
  title.align = 'left';
  title.horizontalCenter = 'left';
  title.marginLeft = 20;
  title.paddingBottom = 10;
  title.y = 20;

  // Bubbles
  /*
  const bubbleSeries = chart.series.push(new am4maps.MapImageSeries());
  bubbleSeries.data = cases;
  bubbleSeries.dataFields.value = ('value') ? '1' : 1;
  bubbleSeries.dataFields.id = 'id';

  // adjust tooltip
  bubbleSeries.tooltip.animationDuration = 0;
  bubbleSeries.tooltip.showInViewport = false;
  bubbleSeries.tooltip.background.fillOpacity = 0.2;
  bubbleSeries.tooltip.getStrokeFromObject = true;
  bubbleSeries.tooltip.getFillFromObject = false;
  bubbleSeries.tooltip.background.fillOpacity = 0.2;
  bubbleSeries.tooltip.background.fill = am4core.color('#000000');

  const imageTemplate = bubbleSeries.mapImages.template;
  // if you want bubbles to become bigger when zoomed, set this to false
  imageTemplate.nonScaling = true;
  imageTemplate.strokeOpacity = 0;
  imageTemplate.fillOpacity = 0.5;
  imageTemplate.tooltipText = '{Country}: [bold]{value}[/]';
  // this is needed for the tooltip to point to the top of the circle instead of the middle
  imageTemplate.adapter.add('tooltipY', (tooltipY, target) => -target.children.getIndex(0).radius);

  //  imageTemplate.events.on('over', handleImageOver);
  //  imageTemplate.events.on('out', handleImageOut);
  //  imageTemplate.events.on('hit', handleImageHit);

  // When hovered, circles become non-opaque
  const imageHoverState = imageTemplate.states.create('hover');
  imageHoverState.properties.fillOpacity = 1;

  // add circle inside the image
  const circle = imageTemplate.createChild(am4core.Circle);
  // this makes the circle to pulsate a bit when showing it
  circle.hiddenState.properties.scale = 0.0001;
  circle.hiddenState.transitionDuration = 2000;
  circle.defaultState.transitionDuration = 2000;
  circle.defaultState.transitionEasing = am4core.ease.elasticOut;
  circle.applyOnClones = true;

  // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
  bubbleSeries.heatRules.push({
    target: circle,
    property: 'radius',
    min: 3,
    max: 30,
    dataField: 'value',
  });

  // when data items validated, hide 0 value bubbles (because min size is set)
  bubbleSeries.events.on('dataitemsvalidated', () => {
    bubbleSeries.dataItems.each((dataItem) => {
      const { mapImage } = dataItem;
      const circle = mapImage.children.getIndex(0);
      if (mapImage.dataItem.value === 0) {
        circle.hide(0);
      } else if (circle.isHidden || circle.isHiding) {
        circle.show();
      }
    });
  });

  // this places bubbles at the visual center of a country
  imageTemplate.adapter.add('latitude', (latitude, target) => {
    const polygon = polygonSeries.getPolygonById(target.dataItem.id);
    if (polygon) {
      return polygon.visualLatitude;
    }
    return latitude;
  });

  imageTemplate.adapter.add('longitude', (longitude, target) => {
    const polygon = polygonSeries.getPolygonById(target.dataItem.id);
    if (polygon) {
      return polygon.visualLongitude;
    }
    return longitude;
  });
  */
};

export default renderMap;
