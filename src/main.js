import Vue from "vue";
import App from "./App.vue";
import "destyle.css";

import Modal from "@burhanahmeed/vue-modal-2";

Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
