export default {
    install(Vue, { store, errName }) {
        let prototype = Vue.prototype;
        let errors;
        if (errName != undefined) {
            errors = prototype[errName] = store.state.errors
        } else {
            errors = prototype.$errors = store.state.errors
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