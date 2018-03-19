'use strict';
(function () {

  var PRICE = {
    MIN: 10000,
    MAX: 50000
  };
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var inputFeaturesAll = document.querySelectorAll('#housing-features input');
  var mapFiltersContainer = null;

  var filterCallback = function () {
    var errorMes = 'you must registre callback by onFilterChange';
    return errorMes;
  };

  var initFilters = function (container, clbc) {
    filterCallback = clbc;
    mapFiltersContainer = container;
    mapFiltersContainer.classList.remove('map__filters-container--hidden');
    mapFiltersContainer.addEventListener('change', filterChangeHandler);
  };

  var priceRangeIsLow = function (price) {
    return price < PRICE.MIN;
  };

  var priceRangeIsMiddle = function (price) {
    return price >= PRICE.MIN && price <= PRICE.MAX;
  };

  var priceRangeIsHigh = function (price) {
    return price > PRICE.MAX;
  };

  var trackPrice = function (priceInVal, inputInVal) {
    switch (inputInVal) {
      case 'low':
        return priceRangeIsLow(priceInVal);
      case 'middle':
        return priceRangeIsMiddle(priceInVal);
      case 'high':
        return priceRangeIsHigh(priceInVal);
    }
    return trackPrice([inputInVal], priceInVal);
  };

  var filterType = function (advert) {
    return housingType.value === 'any' ? true : advert.offer.type === housingType.value;
  };

  var filterPrice = function (advert) {
    return housingPrice.value === 'any' ? true : trackPrice(advert.offer.price, housingPrice.value);
  };

  var filterRooms = function (advert) {
    return housingRooms.value === 'any' ? true : (advert.offer.rooms) === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (advert) {
    return housingGuests.value === 'any' ? true : (advert.offer.guests) === parseInt(housingGuests.value, 10);
  };

  var filterFeatures = function (advert, trackInput) {
    var features = advert.offer.features;
    var dataFeatures = trackInput.every(function (advertFeatures) {
      return features.indexOf(advertFeatures) !== -1;
    });
    return dataFeatures;
  };

  var getVerifiedFeatures = function () {
    var inputFeaturesArr = Array.prototype.slice.call(inputFeaturesAll);
    var inputVerified = [];

    inputFeaturesArr.reduce(function (prevData, item) {
      var inputVal = item.value;
      if (item.checked) {
        inputVerified.push(inputVal);
      }
    }, 0);
    return inputVerified;
  };

  var getFilterArr = function (data, trackInput) {
    return data.filter(function (ad) {
      return filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad, trackInput);
    });
  };

  var applyFilters = function () {
    var advertData = window.map.mainData;
    var inputVerifiedFeatures = getVerifiedFeatures();
    var filterArrAdvert = getFilterArr(advertData, inputVerifiedFeatures);
    filterCallback(filterArrAdvert);
  };

  function filterChangeHandler(evt) {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'SELECT') {
      window.util.debounce(applyFilters);
    }
  }

  window.filter = {
    initFilters: initFilters
  };

})();

