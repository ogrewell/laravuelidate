"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  install: function install(Vue, _ref) {
    var store = _ref.store,
        errName = _ref.errName;
    var prototype = Vue.prototype;
    var errors;

    if (errName != undefined) {
      errors = prototype[errName] = store.state.errors;
    } else {
      errors = prototype.$errors = store.state.errors;
    }

    errors.has = function (field) {
      if (errors.all[field]) {
        return true;
      }

      return false;
    };

    errors.first = function (field) {
      if (errors.all[field]) {
        return errors.all[field][0];
      }
    };

    errors.get = function (field) {
      if (errors.all[field]) {
        return errors.all[field];
      }

      return;
    };
  }
};
exports["default"] = _default;