export const renderFullScreenButton = () => {
  const globalMap = document.querySelector('.global-map');
  const fullScreenMap = document.createElement('button');
  const fullScreenMapIcon = document.createElement('i');

  fullScreenMap.classList.add('global-map_full-screen');
  fullScreenMapIcon.classList.add('mdi', 'mdi-fullscreen');

  globalMap.append(fullScreenMap);
  fullScreenMap.append(fullScreenMapIcon);

  fullScreenMap.addEventListener('click', () => {
    globalMap.classList.toggle('global-map_full-screen--active');
  });
};
