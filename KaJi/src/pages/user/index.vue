<template>
  <div class="user-background">
    <form report-submit="true" @submit="formSubmit">
      <user-info></user-info>
      <panel title="视频">
        <a href="/pages/video-list/main" hover-class="none">
          <cell-button img="/static/icons/video.png" text="视频列表"></cell-button>
        </a>
      </panel>
      <div class="weui-panel weui-panel--padding">
        <div class="weui-panel__bd">
          <div class="weui-panel__hd">设置</div>
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells weui-cells_in-small-appmsg">
              <cell-switch title="拍照提醒"
                           img="/static/icons/remind.png"
                           :checked="daily_notify"
                           :onSwitchChange="switchDailyNotify"></cell-switch>
              <cell-picker title="提醒时间" v-if="daily_notify"
                           img="/static/icons/period.png"
                           :value="notify_time" :range="notifyTimes"
                           :onPickerChange="changeNotifyTime"></cell-picker>
              <cell-picker title="每幅时长"
                           img="/static/icons/duration.png"
                           :value="duration" :range="durations"
                           :onPickerChange="changeDuration"></cell-picker>
            </div>
          </div>
        </div>
      </div>
      <panel title="其他">
        <a href="/pages/tutorial/main" hover-class="none">
          <button form-type="submit">
            <cell-button img="/static/icons/tutorial.png" text="查看教程"></cell-button>
          </button>
        </a>
        <button form-type="submit" hover-class="none" open-type="contact">
          <cell-button img="/static/icons/contact.png" text="联系我们"></cell-button>
        </button>
      </panel>
    </form>
    <footer>
      <mp-footer text="VERSION 1.0.0"></mp-footer>
      <mp-footer text="KAJI STUDIO © 2018"></mp-footer>
    </footer>
  </div>
</template>

<script>
import MpFooter from 'mp-weui/packages/footer';
import { mapActions, mapState } from 'vuex';

import store from '../../store';
import { request } from '../../util';
import cellButton from './cell-button';
import cellPicker from './cell-picker';
import cellSwitch from './cell-switch';
import userInfo from './info';
import panel from '../../components/panel';

export default {
  components: {
    MpFooter,
    cellButton,
    cellPicker,
    cellSwitch,
    userInfo,
    panel,
  },

  store,

  computed: mapState({
    daily_notify: state => state.settings.daily_notify,
    notify_time: state => state.settings.notify_time,
    duration: state => state.settings.duration,
  }),

  data() {
    return {
      notifyTimes: [
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ],
      durations: ['1s', '2s', '3s', '4s'],
    };
  },

  onLoad() {
    this.getSettings();
  },

  methods: {
    ...mapActions(['getSettings', 'updateSettings']),

    switchDailyNotify(value) {
      this.updateSettings({ daily_notify: value });
    },

    changeNotifyTime(value) {
      this.updateSettings({ notify_time: parseInt(value) });
    },

    changeDuration(value) {
      this.updateSettings({ duration: parseInt(value) });
    },

    async formSubmit(e) {
      const formId = e.mp.detail.formId;
      if (!formId.includes('the formId is a mock one')) {
        await request('formId', 'POST', { formId });
      }
    },
  },
};
</script>


<style lang="scss">
@import '../../theme';

button,
button::after {
  margin: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  line-height: 1.5;
  text-align: start;
}

.user-background {
  background-color: $background-color;
  height: 100%;
}

.weui-panel--padding {
  margin: 35px 0;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

footer {
  margin: 35px 0;
}
</style>
