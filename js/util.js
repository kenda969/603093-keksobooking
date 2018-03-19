'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;
  var debounce = function (dbs) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(dbs, DEBOUNCE_INTERVAL);
  };

  window.util = {
    debounce: debounce
  };

})();
