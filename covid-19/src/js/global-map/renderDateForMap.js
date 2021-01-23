import { color } from '@amcharts/amcharts4/core';

export const renderDateForMap = (chart, date) => {
  const dateTitle = chart.titles.create();

  dateTitle.fontSize = 14;
  dateTitle.fill = color('#ffffff');
  dateTitle.text = `World, ${date.slice(0, 10)}`;
  dateTitle.align = 'left';
  dateTitle.horizontalCenter = 'left';
  dateTitle.marginLeft = 20;
  dateTitle.paddingBottom = 10;
  dateTitle.y = 20;
};
