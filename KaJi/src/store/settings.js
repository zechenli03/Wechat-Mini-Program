import { request, warning } from '../util';

export const settings = {
  state: {
    daily_notify: true,
    notify_time: 0,
    duration: 0,
  },
  mutations: {
    settingsUpdated(state, settings) {
      const { daily_notify, notify_time, duration } = settings;
      state.daily_notify = daily_notify;
      state.notify_time = notify_time;
      state.duration = duration;
    },
  },
  actions: {
    updateSettings: async ({ state, commit }, settings) => {
      wx.showLoading({ title: '更新用户配置...' });
      try {
        const newSettings = await request('settings', 'PUT', {
          daily_notify: state.daily_notify,
          notify_time: state.notify_time,
          duration: state.duration,
          ...settings,
        });
        commit('settingsUpdated', newSettings);
      } catch (e) {
        console.log(e);
        warning('用户配置更新失败!');
      }
      wx.hideLoading();
    },
    getSettings: async ({ state, commit }) => {
      wx.showLoading({ title: '获取用户配置...' });
      try {
        const settings = await request('settings');
        commit('settingsUpdated', settings);
      } catch (e) {
        console.log(e);
        warning('获取用户配置失败!');
      }
      wx.hideLoading();
    },
  },
};
