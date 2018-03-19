'use strict';
(function () {

  // Поиск DOM элементов.
  var mapPinTemplate = window.data.templateContent.querySelector('.map__pin');
  var buttonElementField = document.querySelector('.map__pins');

  // Клонирование Pin'ов.
  var generateButtonItem = function (advert) {
    var buttonElement = mapPinTemplate.cloneNode(true);
    buttonElement.style.top = (advert.location.y - window.data.PIN_SIZE.PIN_HEIGHT) + 'px';
    buttonElement.style.left = (advert.location.x) + 'px';
    buttonElement.querySelector('img').src = advert.author.avatar;
    buttonElement.addEventListener('click', function (evt) {
      window.map.mapPinClickHandler(evt, advert);
    });
    return buttonElement;
  };

  window.pin = {
    mapPinTemplate: mapPinTemplate,
    buttonElementField: buttonElementField,
    generateButtonItem: generateButtonItem
  };

})();
