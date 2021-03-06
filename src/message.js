export default {
    install(Vue, { store, errName, isDefault }) {
        let prototype = Vue.prototype;
        let errors;
        let state = isDefault ? store.default.state.errors : store.state.errors
        if (errName) {
            errors = prototype[errName] = state
        } else {
            errors = prototype.$errors = state
        }
        errors.has = (field) => {
            if (errors.all[field]) {
                return true;
            }
            return false;
        }

        errors.first = (field) => {
            if (errors.all[field]) {
                return errors.all[field][0]
            }
        }

        errors.get = (field) => {
            if (errors.all[field]) {
                return errors.all[field]
            }
            return;
        }

        errors.every = () => {
            let values = Object.values(errors.all)
            let arrays = values.map(item => Object.values(item));
            let merged = [].concat.apply([], arrays);
            return merged;
        }

    }
}