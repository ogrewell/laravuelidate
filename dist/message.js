"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  install: function install(Vue, _ref) {
    var store = _ref.store,
        errName = _ref.errName,
        isDefault = _ref.isDefault;
    var prototype = Vue.prototype;
    var errors;
    var state = isDefault ? store["default"].state.errors : store.state.errors;

    if (errName) {
      errors = prototype[errName] = state;
    } else {
      errors = prototype.$errors = state;
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

    errors.every = function () {
      var values = Object.values(errors.all);
      var arrays = values.map(function (item) {
        return Object.values(item);
      });
      var merged = [].concat.apply([], arrays);
      return merged;
    };
  }
};
exports["default"] = _default;