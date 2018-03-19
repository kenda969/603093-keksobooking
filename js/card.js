'use strict';
(function () {

  // Поиск DOM элементов.
  var mapCardTemplate = window.data.templateContent.querySelector('.map__card');

  // Клонирование  pop-up окна.
  var popupAd = function (advert) {
    var adElement = mapCardTemplate.cloneNode(true);
    adElement.querySelector('h3').textContent = advert.offer.title;
    adElement.querySelector('small').textContent = advert.location.x + ',' + advert.location.y;
    adElement.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';
    adElement.querySelector('.popup__rooms').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    adElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;

    var adElementFeatures = adElement.querySelector('.popup__features');
    adElementFeatures.innerHTML = '';

    advert.offer.features.forEach(function (feature) {
      var adElementLi = document.createElement('li');
      adElementLi.className = 'feature feature--' + feature;
      adElementFeatures.appendChild(adElementLi);
    });

    adElement.querySelector('.popup__description').textContent = advert.offer.description;

    var adElementPhotos = adElement.querySelector('.popup__pictures').querySelector('li');
    adElementPhotos.innerHTML = '';

    advert.offer.photos.forEach(function (path) {
      var adElementImg = document.createElement('img');
      adElementImg.src = path;
      adElementImg.style.width = '50px';
      adElementImg.style.height = '60px';
      adElementImg.style.paddingLeft = '14px';
      adElementPhotos.appendChild(adElementImg);
    });

    adElement.querySelector('.popup__avatar').src = advert.author.avatar;

    return adElement;
  };

  window.card = {
    popupAd: popupAd
  };

})();
