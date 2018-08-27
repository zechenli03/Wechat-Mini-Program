import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '今日',
    backgroundColor: '#f5f5f5',
  },
};
