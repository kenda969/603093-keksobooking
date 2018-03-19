'use strict';
(function () {

  var i;
  var fragment = document.createDocumentFragment();

  // Поиск DOM элементов.
  var adListElement = document.querySelector('.map');
  var mapFiltersContainer = adListElement.querySelector('.map__filters-container');
  var noticeFormFildsets = window.form.noticeFormContain.querySelectorAll('fieldset');
  var noticeFormFildsetAdress = document.querySelector('#address');
  var mainButton = document.querySelector('.map__pin--main');
  var buttonReset = window.form.noticeFormContain.querySelector('.form__reset');
  var priceValue = window.form.noticeFormContain.querySelector('#price');
  var coordWriteValueAddress = {
    widthPin: (adListElement.offsetWidth / 2) + (window.data.PIN_SIZE.PIN_WIDTH / 2),
    heightPin: ((adListElement.offsetHeight / 2) - window.data.PIN_SIZE.PIN_HEIGHT / 2)
  };

  // Удаление пинов
  var deletePins = function () {
    var mapPinTemplates = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinTemplates.forEach(function (pin) {
      window.pin.buttonElementField.removeChild(pin);
    });
  };

  // Отправка формы на сервер
  window.form.noticeFormContain.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(window.form.noticeFormContain);
    window.backend.save(data, window.form.displaySendingMessage, window.form.displayErrorMessage);
    disabledPage();
    mainButton.addEventListener('click', enabledFormClickHandler);
  });

  // Удаление Попап
  var deletePopup = function () {
    var oldPopup = adListElement.querySelector('.popup');
    if (oldPopup) {
      adListElement.removeChild(oldPopup);
    }
  };

  // Отрисовка Попап
  var renderPopup = function (advert) {
    var popup = window.card.popupAd(advert);
    var popupCloseButton = popup.querySelector('.popup__close');

    var popupCloseButtonKeyDownHandler = function (evt) {
      if (evt.keyCode === window.data.ESC) {
        deletePopup();
        document.removeEventListener('keydown', popupCloseButtonKeyDownHandler);
      }
      document.addEventListener('keydown', popupCloseButtonKeyDownHandler);
    };
    document.addEventListener('keydown', popupCloseButtonKeyDownHandler);

    // кнопка закрытия попап окна нажатием на крестик.
    popupCloseButton.addEventListener('click', function () {
      adListElement.removeChild(popup);
    });

    adFildsetAdress(advert);
    fragment.appendChild(popup);
    deletePopup();
    adListElement.insertBefore(fragment, mapFiltersContainer);
  };

  // Пин кнопка.
  var mapPinClickHandler = function (evt, pinAdd) {
    renderPopup(pinAdd);
  };

  // Вставка адреса в меню
  var adFildsetAdress = function (advert) {
    noticeFormFildsetAdress.value = advert.location.x + ',' + advert.location.y;
  };

  // добавить всем Fildset'ам disabled
  var establishDisabledAttr = function () {
    for (i = 0; i < noticeFormFildsets.length; i++) {
      noticeFormFildsets[i].disabled = 'disabled';
    }
  };

  // Главная Кнопка.
  var enabledForm = function () {
    adListElement.classList.remove('map--faded');
    mainButton.style.zIndex = '99';
    window.form.noticeFormContain.classList.remove('notice__form--disabled');
    for (i = 0; i < noticeFormFildsets.length; i++) {
      noticeFormFildsets[i].disabled = '';
      window.form.getDefaultGuest();
    }
    mainButton.removeEventListener('click', enabledFormClickHandler);
  };

  mainButton.style.left = coordWriteValueAddress.widthPin + 'px';
  mainButton.style.top = coordWriteValueAddress.heightPin + 'px';

  // перевод страницы в изначальное состояние
  var disabledPage = function () {
    window.form.establishHoticeFormInactive();
    adListElement.classList.add('map--faded');
    establishDisabledAttr();
    mainButton.style.left = coordWriteValueAddress.widthPin + 'px';
    mainButton.style.top = coordWriteValueAddress.heightPin + 'px';
    priceValue.placeholder = 'минимальная цена ' + 1000;
    priceValue.min = 1000;
    deletePins();
    deletePopup();
  };

  // Отрисовка пинов
  var renderAdvertPins = function (advert) {
    deletePins();
    deletePopup();

    advert.slice(0, 5).forEach(function (adverts) {
      window.map.fragment.appendChild(window.pin.generateButtonItem(adverts));
      window.pin.buttonElementField.appendChild(window.map.fragment);
    });
  };

  var loadData = function (adverts) {
    window.map.mainData = adverts;
    renderAdvertPins(adverts);
    window.filter.initFilters(mapFiltersContainer, renderAdvertPins);
  };

  var enabledFormClickHandler = function () {
    enabledForm();
    window.backend.load(loadData, window.form.displayErrorMessage);
    mainButton.removeEventListener('click', enabledFormClickHandler);
  };
  mainButton.addEventListener('click', enabledFormClickHandler);

  // Кнопка reset
  var buttonResetClickHandler = function (evt) {
    evt.preventDefault();
    disabledPage();
    mainButton.addEventListener('click', enabledFormClickHandler);
    buttonReset.addEventListener('click', buttonResetClickHandler);
  };

  // Реализация перетаскивания главной кнопки по полю
  mainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var beginCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var mainButtonMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: beginCoords.x - moveEvt.clientX,
        y: beginCoords.y - moveEvt.clientY
      };

      beginCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainButton.style.left = mainButton.offsetLeft - shift.x + 'px';

      //  Ограничение пина по координате X
      if (mainButton.offsetLeft - shift.x < window.data.PIN_SIZE.PIN_WIDTH / 2) {
        mainButton.style.left = window.data.PIN_SIZE.PIN_WIDTH / 2 + 'px';
      } else if (mainButton.offsetLeft - shift.x > adListElement.offsetWidth - (window.data.PIN_SIZE.PIN_WIDTH / 2)) {
        mainButton.style.left = adListElement.offsetWidth - (window.data.PIN_SIZE.PIN_WIDTH / 2) + 'px';
      }

      mainButton.style.top = mainButton.offsetTop - shift.y + 'px';

      //  Ограничение пина по координате Y
      if (mainButton.offsetTop - shift.y < window.data.PIN_SIZE.PIN_OFFSET_MIN) {
        mainButton.style.top = window.data.PIN_SIZE.PIN_OFFSET_MIN + 'px';
      } else if (mainButton.offsetTop - shift.y > window.data.PIN_SIZE.PIN_OFFSET_MAX) {
        mainButton.style.top = window.data.PIN_SIZE.PIN_OFFSET_MAX + 'px';
      }
    };

    var mainButtonMouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      noticeFormFildsetAdress.value = mainButton.offsetLeft + ', ' + (mainButton.offsetTop + window.data.PIN_SIZE .PIN_CORRECTION);
      document.removeEventListener('mousemove', mainButtonMousemoveHandler);
      document.removeEventListener('mouseup', mainButtonMouseupHandler);
      if (dragged) {
        var preventDefaultClickHandler = function (drEvt) {
          drEvt.preventDefault();
          mainButton.removeEventListener('click', preventDefaultClickHandler);
        };
        mainButton.addEventListener('click', preventDefaultClickHandler);
      }
    };
    document.addEventListener('mousemove', mainButtonMousemoveHandler);
    document.addEventListener('mouseup', mainButtonMouseupHandler);
  });


  mainButton.addEventListener('click', enabledFormClickHandler);
  buttonReset.addEventListener('click', buttonResetClickHandler);
  establishDisabledAttr();

  window.map = {
    fragment: fragment,
    adListElement: adListElement,
    mainData: [],
    mapPinClickHandler: mapPinClickHandler
  };

})();

