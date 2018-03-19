'use strict';
(function () {

  var priceMin = 1000;

  // Заполнение формы
  var noticeFormContain = document.querySelector('.notice__form');
  var noticeFormType = noticeFormContain.querySelector('#type');
  var noticeFormAdress = noticeFormContain.querySelector('#address');
  var noticeFormTimein = noticeFormContain.querySelector('#timein');
  var noticeFormTimeout = noticeFormContain.querySelector('#timeout');
  var noticeFormRoomNumber = noticeFormContain.querySelector('#room_number');
  var noticeFormCapacity = noticeFormContain.querySelector('#capacity');
  var noticeFormCapacityOptions = noticeFormCapacity.querySelectorAll('option');

  var establishHoticeFormTitleMinMax = function () {
    var noticeFormTitle = noticeFormContain.querySelector('#title');
    noticeFormTitle.minLength = window.data.CONST_NOTICE_FORM.TITLE_MIN;
    noticeFormTitle.maxLength = window.data.CONST_NOTICE_FORM.TITLE_MAX;
    noticeFormTitle.required = 'required';
  };

  var establishHoticeFormAdressReadonly = function () {
    noticeFormAdress.readOnly = 'readonly';
  };

  var establishHoticeFormPriceMinMax = function () {
    var noticeFormPrice = noticeFormContain.querySelector('#price');
    noticeFormPrice.max = window.data.CONST_NOTICE_FORM.PRICE_MAX;
    noticeFormPrice.min = priceMin;
    noticeFormPrice.required = 'required';

    // Реализация минимальной цены в зависимости от выбранний квартиры.
    noticeFormType.onchange = function () {
      var name = this.value;
      switch (name) {
        case window.data.TYPE_BUILDING[0]:
          priceMin = 1000;
          break;
        case window.data.TYPE_BUILDING[1]:
          priceMin = 0;
          break;
        case window.data.TYPE_BUILDING[2]:
          priceMin = 5000;
          break;
        case window.data.TYPE_BUILDING[3]:
          priceMin = 10000;
          break;
      }
      noticeFormPrice.placeholder = 'минимальная цена ' + priceMin;
      noticeFormPrice.min = priceMin;
    };
  };

  // Реализация въезда, выезда из снимаемой площади
  var changeHoticeFormTime = function () {
    noticeFormTimein.addEventListener('change', function () {
      noticeFormTimeout.value = noticeFormTimein.value;
    });

    noticeFormTimeout.addEventListener('change', function () {
      noticeFormTimein.value = noticeFormTimeout.value;
    });
  };

  // Кол-во гостей по отношению к выбранному кол-во комнат
  var getDefaultGuest = function () {
    noticeFormCapacityOptions.forEach(function (item) {
      item.disabled = !window.data.NOTICE_FORM_GUESTS[noticeFormRoomNumber.value].includes(item.value);
    });
  };

  var noticeFormRoomGuestsClickHandler = function () {
    noticeFormCapacityOptions.forEach(function (item) {
      item.disabled = !window.data.NOTICE_FORM_GUESTS[noticeFormRoomNumber.value].includes(item.value);
      noticeFormCapacity.value = window.data.NOTICE_FORM_GUESTS[noticeFormRoomNumber.value][0];
    });
  };

  var establishHoticeFormInactive = function () {
    noticeFormContain.reset();
    noticeFormContain.classList.add('notice__form--disabled');
  };

  // Вывод ошибки
  var displayErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #c6c6c6; padding: 32px, 0, 10px, 0';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.position = 'fixed';
    node.style.width = '300px';
    node.style.left = '50%';
    node.style.top = '50px';
    node.style.fontSize = '30px';
    node.innerHTML = '<p>' + errorMessage + '</p>';
    node.style.borderRadius = '5px';
    button.textContent = 'Х';
    button.style = 'width: 20px; height: 20px; background-color: #2EC4B6; border: none; border-radius: 3px; cursor: pointer;';
    node.appendChild(button);
    button.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  };

    // Вывод сообщения о у спешной загрузке данных
  var displaySendingMessage = function () {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #c6c6c6; padding: 32px, 0, 10px, 0';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.position = 'fixed';
    node.style.width = '300px';
    node.style.left = '50%';
    node.style.top = '50px';
    node.style.fontSize = '30px';
    node.innerHTML = '<p>' + 'Данные успешно отправлены' + '</p>';
    node.style.borderRadius = '5px';
    button.textContent = 'Х';
    button.style = 'width: 20px; height: 20px; background-color: #2EC4B6; border: none; border-radius: 3px; cursor: pointer;';
    node.appendChild(button);
    button.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  };

  noticeFormRoomNumber.addEventListener('change', noticeFormRoomGuestsClickHandler);
  establishHoticeFormTitleMinMax();
  establishHoticeFormAdressReadonly();
  establishHoticeFormPriceMinMax();
  changeHoticeFormTime();

  window.form = {
    noticeFormContain: noticeFormContain,
    displayErrorMessage: displayErrorMessage,
    displaySendingMessage: displaySendingMessage,
    getDefaultGuest: getDefaultGuest,
    establishHoticeFormInactive: establishHoticeFormInactive
  };

})();
