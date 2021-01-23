import { color, percent } from '@amcharts/amcharts4/core';
import { HeatLegend } from '@amcharts/amcharts4/maps';

export const renderHeatLegendForMap = (polygonSeries, chart) => {
  const heatLegend = chart.createChild(HeatLegend);
  heatLegend.background.fill = color('#ffffff');
  heatLegend.background.fillOpacity = 0.30;
  heatLegend.padding(10, 5, 10, 70);
  heatLegend.series = polygonSeries;
  heatLegend.align = 'right';
  heatLegend.valign = 'bottom';
  heatLegend.height = percent(80);
  heatLegend.orientation = 'vertical';
  heatLegend.valign = 'middle';
  heatLegend.marginRight = percent(1);
  heatLegend.valueAxis.renderer.opposite = true;
  heatLegend.valueAxis.renderer.dx = -25;
  heatLegend.valueAxis.fontSize = 11;
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
};
