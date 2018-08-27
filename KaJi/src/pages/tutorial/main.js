import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '用户教程',
    navigationBarBackgroundColor: '#ffffff',
    backgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
};
