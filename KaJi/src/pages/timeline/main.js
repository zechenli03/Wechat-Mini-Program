import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '时光轴',
    backgroundColor: '#2d8cf0',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'light',
  },
};
