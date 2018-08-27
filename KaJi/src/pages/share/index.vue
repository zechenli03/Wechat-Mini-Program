<template>
  <div class="container" v-if="video">
    <video-player :video="video"></video-player>
    <panel title="操作">
      <div class="weui-cell weui-cell_access" @click="downloadClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/download.png"/>
        </div>
        <div class="weui-cell__bd">下载视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <a href="/pages/today/main" open-type="switchTab" hover-class="none" class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/video.png"/>
        </div>
        <div class="weui-cell__bd">返回首页</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
    </panel>
  </div>
</template>

<script>
import format from 'date-fns/format';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';

import videoPlayer from '../../components/video-player';
import panel from '../../components/panel';
import { request, saveVideoToAlbum } from '../../util';

export default {
  components: {
    MpCell,
    MpCellGroup,
    videoPlayer,
    panel,
  },

  data() {
    return {
      video: null,
    };
  },

  async onLoad() {
    wx.showLoading({ title: '正在加载...' });
    try {
      const video = await request('videos/' + this.$root.$mp.query.share);
      video.created_at = format(video.created_at, 'M月D日 HH:mm');
      this.video = video;
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },

  methods: {
    async downloadClick() {
      try {
        await saveVideoToAlbum(this.video.video);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../theme';

page {
  height: 100%;
  background-color: $background-color;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
