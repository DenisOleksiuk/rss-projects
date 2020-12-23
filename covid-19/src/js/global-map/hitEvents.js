const addHitEvents = (polygonSeries) => {
  polygonSeries.mapPolygons.template.events.on('hit', (ev) => {
    const { chart } = ev.target.series;
    chart.zoomToMapObject(ev.target);
  });
};

export default addHitEvents;
