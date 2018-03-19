'use strict';
(function () {

  var PIN_SIZE = {
    PIN_CORRECTION: 82,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    PIN_OFFSET_MIN: 150,
    PIN_OFFSET_MAX: 650
  };

  var CONST_NOTICE_FORM = {
    TITLE_MIN: 30,
    TITLE_MAX: 100,
    PRICE_MAX: 1000000
  };

  var TYPE_BUILDING = [
    'flat',
    'bungalo',
    'house',
    'palace'];

  var NOTICE_FORM_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  window.data = {
    ESC: 27,
    PIN_SIZE: PIN_SIZE,
    CONST_NOTICE_FORM: CONST_NOTICE_FORM,
    TYPE_BUILDING: TYPE_BUILDING,
    NOTICE_FORM_GUESTS: NOTICE_FORM_GUESTS,
    templateContent: document.querySelector('template').content
  };

})();
