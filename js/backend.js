'use strict';
(function () {

  var URL = 'https://js.dump.academy/keksobooking';

  var cardRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 20000;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Превышение ожидания запроса' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = cardRequest(loadHandler, errorHandler);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = cardRequest(loadHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
