(function () {
  const appearLeftClass = 'appear_left-animade';
  const appearRightClass = 'appear_right-animade';
  const appearHiddenClass = 'appear--hidden';

  let appearLeftElements;
  let appearRightElements;
  let windowHeight;

  let initialized = false;

  const init = () => {
    windowHeight = window.innerHeight;
    appearLeftElements = document.getElementsByClassName('appear_left');
    appearRightElements = document.getElementsByClassName('appear_right');
    initialized = true;
  };

  const insertAnimation = (element, className) => {
    const positionTop = element.getBoundingClientRect().top;
    if (positionTop - windowHeight <= 0) {
      element.classList.remove(appearHiddenClass);
      element.classList.add(className);
    }
  };

  const insertAnimationToElementList = (elementList, className) => {
    for (let i = 0; i < elementList.length; i++) {
      insertAnimation(elementList.item(i), className);
    }
  };

  const checkPosition = () => {
    if (initialized) {
      insertAnimationToElementList(appearRightElements, appearRightClass);
      insertAnimationToElementList(appearLeftElements, appearLeftClass);
    }
  };

  const removeListener = () => {
    if (initialized) {
      if (window.scrollY + windowHeight + 5 >= document.body.scrollHeight) {
        window.removeEventListener('load', checkPosition);
        window.removeEventListener('scroll', checkPosition);
        window.removeEventListener('scroll', removeListener);
      }
    }
  };

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);
  window.addEventListener('load', init);
  window.addEventListener('load', checkPosition);
  window.addEventListener('scroll', removeListener);
}());
