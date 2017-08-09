// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

// Initialize Firebase
let config = {
    apiKey: "AIzaSyB7eNV-LdmhFmpS7f8Oq3N-8940k_RiHzI",
    authDomain: "padavan-63ee8.firebaseapp.com",
    databaseURL: "https://padavan-63ee8.firebaseio.com",
    projectId: "padavan-63ee8",
    storageBucket: "padavan-63ee8.appspot.com",
    messagingSenderId: "282574467330"
};
firebase.initializeApp(config);

window.firebase = firebase
/* eslint-disable no-new */

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    store.dispatch('setUser', user)

    new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App },
        store
    })

    unsubscribe()
})

