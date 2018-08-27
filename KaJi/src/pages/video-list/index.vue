<template>
  <form report-submit="true" class="container">
    <div v-if="videos.length > 0">
      <video-summary v-for="video in videos" :key="video.id" :video="video"></video-summary>
    </div>
    <big-image v-else text="视频列表空空如也" src="/static/picture/video_empty.jpg"></big-image>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import videoSummary from './video-summary';
import store from '../../store';
import bigImage from '../../components/big-image';

export default {
  components: {
    bigImage,
    videoSummary,
  },

  store,

  computed: mapState({ videos: state => state.videos.videos }),

  async onLoad() {
    if (this.videos.length === 0) {
      wx.showLoading({ title: '获取视频列表...' });
      await this.fetchVideos();
      wx.hideLoading();
    }
  },

  async onPullDownRefresh() {
    await this.fetchVideos();
    wx.stopPullDownRefresh();
  },

  methods: mapActions(['fetchVideos']),
};
</script>

<style lang="scss">
@import '../../theme';

page {
  width: 100%;
  height: 100%;
  background-color: $background-color;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
