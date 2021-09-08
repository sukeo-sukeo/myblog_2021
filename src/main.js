import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import "./assets/common.css";

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

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
