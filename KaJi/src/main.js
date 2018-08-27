import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    pages: ['^pages/today/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2d8cf0',
      navigationBarTextStyle: '#ffffff',
    },
    tabBar: {
      color: '#80848f',
      selectedColor: '#2d8cf0',
      backgroundColor: '#ffffff',
      list: [
        {
          text: '今日',
          pagePath: 'pages/today/main',
          iconPath: 'static/tab/camera.png',
          selectedIconPath: 'static/tab/camera_selected.png',
        },
        {
          text: '时光轴',
          pagePath: 'pages/timeline/main',
          iconPath: 'static/tab/view_day.png',
          selectedIconPath: 'static/tab/view_day_selected.png',
        },
        {
          text: '我的',
          pagePath: 'pages/user/main',
          iconPath: 'static/tab/person.png',
          selectedIconPath: 'static/tab/person_selected.png',
        },
      ],
    },
  },
};
