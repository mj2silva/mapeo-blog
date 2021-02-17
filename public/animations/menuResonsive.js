(function(){
  let menuInitialized = false;
  let openMenuIcon;
  let navMenu;
  let closeMenuIcon;
  let openDropDownButton;
  if (!menuInitialized) {
    openMenuIcon = document.getElementById('headerMenuIcon');
    navMenu = document.getElementById('headerNavigation');
    closeMenuIcon = document.getElementById('closeMenuNav');
    openDropDownButton = document.getElementById('navItem2');
    menuInitialized = true;
  }
  const openMenu = (menuElement) => {
    const menuDisplay = getComputedStyle(menuElement).display;
    if (menuDisplay === 'none') {
      menuElement.style.display = 'block';
      menuElement.firstElementChild.classList.remove('navigation__list--hidden');
      menuElement.firstElementChild.classList.add('navigation__list--mobile');
    }
  };
  const closeMenu = (menuElement) => {
    const menuDisplay = getComputedStyle(menuElement).display;
    if (menuDisplay !== 'none') {
      menuElement.firstElementChild.classList.add('navigation__list--hidden');
      menuElement.firstElementChild.classList.remove('navigation__list--mobile');
      menuElement.style.display = 'none';
    }
  };
  const dropDownToggle = (menuElement) => {
    if (menuElement) {
      console.log({ menu: menuElement });
      const menuDisplay = getComputedStyle(menuElement.lastElementChild).display;
      if (menuDisplay !== 'none') {
        menuElement.lastElementChild.style.display = 'none';
      } else {
        menuElement.lastElementChild.style.display = 'block';
      }
    }
  };
  if (menuInitialized) {
    openMenuIcon.addEventListener('click', () => openMenu(navMenu));
    closeMenuIcon.addEventListener('click', () => closeMenu(navMenu));
    openDropDownButton.addEventListener('click', () => dropDownToggle(openDropDownButton));
  }
})();
