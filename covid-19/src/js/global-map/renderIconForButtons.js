import { Rectangle } from '@amcharts/amcharts4/core';

export const renderButtonIcon = (button, color) => {
  const icon = new Rectangle();

  icon.width = 20;
  icon.height = 20;
  icon.fill = color;
  icon.marginRight = 5;
  button.icon = icon;
};
