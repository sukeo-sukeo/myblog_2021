import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import VuePrlx from "vue-prlx";

import "./assets/common.css";
import EventHub from "./EventHub.js";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(EventHub);
Vue.use(VuePrlx);

Vue.filter("cut_gdid", (val) => {
  if (val.includes("_gdid_")) {
    return val.split("_gdid_")[0];
  } else {
    return val;
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
