import Vue from 'vue'
import App from './App.vue'
// import { createApp } from 'vue';
// import Vant from 'vant';
import router from './router'
import 'vant/lib/index.css';
// 引入组件


// const app = createApp(App);
// app.use(Vant);
// app.mount('#app');
// App.use(Vant)

// App.use(VueRouter)
Vue.config.productionTip = false


// 创建和挂载根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



