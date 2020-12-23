const renderButtonIcon = (button, color) => {
  const icon = new am4core.Rectangle();
  icon.width = 20;
  icon.height = 20;
  // circle.fillOpacity = 0.3;
  icon.fill = color;
  // circle.strokeOpacity = 0;
  // circle.valign = 'middle';
  icon.marginRight = 5;
  button.icon = icon;
};

export default renderButtonIcon;
