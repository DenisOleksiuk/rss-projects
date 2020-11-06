export default function mainMenu() {
  const Menu = {
    elements: {
      main: null
    },

    init() {
      this.main = document.querySelector('main-menu');
    }
  };
  Menu.init();
}
