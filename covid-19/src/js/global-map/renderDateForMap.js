const renderDateForMap = (chart, date) => {
  const dateTitle = chart.titles.create();
  // title.fontSize = '1.5em';
  dateTitle.fontSize = 14;
  dateTitle.fill = am4core.color('#ffffff');
  dateTitle.text = `World, ${date.slice(0, 10)}`;
  dateTitle.align = 'left';
  dateTitle.horizontalCenter = 'left';
  dateTitle.marginLeft = 20;
  dateTitle.paddingBottom = 10;
  dateTitle.y = 20;
};

export default renderDateForMap;
