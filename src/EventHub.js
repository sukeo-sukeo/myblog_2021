"use strict";

const eventHub = {
  install: function(Vue) {
    Vue.prototype.$eventHub = new Vue();
  },
};
export default eventHub;
