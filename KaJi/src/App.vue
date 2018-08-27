<script>
import 'mp-weui/lib/style.css';

import store from './store';
import { navigate, getStorage, login, confirm } from './util';

// import request from wx.js to bypass jwt validation
import { request } from './util/wx';

export default {
  async onLaunch(option) {
    try {
      wx.showLoading({ title: '获取时光轴...' });
      let jwt = await getStorage('jwt');
      if (!jwt) {
        jwt = await request('auth/login', 'POST', { code: await login() });
      }
      store.commit('setJWT', jwt);
      await store.dispatch('fetchPhotos');
      wx.hideLoading();

      if (!option.query.share && !wx.getStorageSync('finishedTutorial')) {
        if (await confirm('是否查看教程?')) {
          navigate('/pages/tutorial/main');
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
