# Laravuelidate
Retrieving errors message from laravel that send to your json response

display errors to your vue+vuex from laravel validations

## Requirements
- [Laravel](https://laravel.com)
- [Vue](https://vuejs.org)
- [Vuex](https://vuex.vuejs.org)

## Installation
Using NPM:
```
npm install @ogrewell/laravuelidate
```

## Usage

Make sure that you use Laravel as the backend of your vue js application

also you need a vuex to set the state of your vue application

### Set Up Your Vuex First
setup your state for handling errors, make sure your vuex apps structure is like this

```
store
    ├── index.js          # where we assemble modules and export the store
    └── modules
        └── errors.js 
```
after your vuex structure has been set up as above, open errors.js and set the state as below

```
// store/modules/errors.js

const state = {
    all:[] // this name is required do not change it as you like
}

const mutations = {
    /**
    * commit error from any "catch" request of your applications
    * you can name it as you like, but make sure you remember it
    */
    setErrors(state,errors){
        state.all = errors
    },
}

const actions = {
    // your choice
}

export default {
    namespaced:true,//required
    state,//required
    mutations,//required too
    actions //not required if you want to commit an error immediately 
}
```

then in your root store, import errors module above

```
//store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

import errors from './modules/errors';
//your other module

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        errors,
        //other module
    },
})

```

and you can set up the ErrorPlugin to your Entry File, the default entry file is `app.js` in laravel so open the `app.js` and add Plugin and the store above

```
//app.js

require('./bootstrap');//this is default, set according to your application


import Vue from 'vue';
import ErrorPlugin from '@ogrewell/laravuelidate`; // you can name the import as you like
import store from './store/index';//make sure you import the store/index correctly

Vue.use(ErrorPlugin,{store,isDefault:true});//this is requirde to hooks your store to ErrorPlugin

// if your are using Vue Router, you can remove 'isDefault' or set it to false
// because if you are using Vue.component and end the require with `default`
// vuex will add `default` object before accessing any vuex store object/method

Vue.component('cart',require('./user/components/cart/show.vue').default) // this is just an example, add your Vue Component here, dont forget to add default in the end of 'require'

const app = new Vue({
    el:'#app',//as you like
    store
})
```

then just run `npm run dev` or `watch`

the `ErrorPlugin` will insert `$errors` global object to your Vue

if you want to change the `$errors` global object, you can add `errName` key inside the second argument of ErrorPlugin like this
```
Vue.use(ErrorPlugin,{store,errName:'yourGlobalErrorObject'})
```

## Retrieve The First Error Message For A Field

To retrieve the first error message for a given field, use the `first` method:

inside the vue template tag:
```
<small class="text-danger">
    {{$errors.first('name')}}
</small>
```
## Retrieving All Error Messages For A Field

If you need to retrieve an array of all the messages for a given field, use the `get` method:

```
<p v-for="(error,index) in $errors.get('name')" :key="index">
{{error}}
</p>
```

## Retrieving All Error Messages For All Fields
To retrieve an array of all messages for every fields, use the `every` method:

```
<p v-for="(error,index) in $errors.every()" :key="index">
    {{error}}
</p>
```


I will return to perfect the documentation and component, thanks :)