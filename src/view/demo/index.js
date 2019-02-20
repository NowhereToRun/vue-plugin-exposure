import Vue from 'vue';
import Main from './main.vue';
import Expose from '../../index';

Vue.use(Expose, { name: 'expose' });

new Vue({
  el: '#root',
  render: (h) => h(Main)
});
