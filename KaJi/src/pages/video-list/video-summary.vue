<template>
  <div class="video" @click="navigate" @longpress="showActionSheet">
    <image class="thumbnail" :src="video.thumbnail_url" mode="aspectFill">
      <div class="duration">{{video.length}} s</div>
    </image>
    <div class="body">
      <p class="title">{{video.name || '未命名视频'}}</p>
      <p class="date">{{video.created_at}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import store from '../../store';
import { confirm, navigate, showActionSheet } from '../../util';

export default {
  name: 'videoSummary',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },

  store,

  methods: {
    ...mapActions(['deleteVideo', 'downloadVideo']),

    navigate() {
      navigate('/pages/video-detail/main?id=' + this.video.id);
    },

    async showActionSheet() {
      switch (await showActionSheet('编辑', '下载', '删除')) {
        case 0:
          navigate(`/pages/video-editor/main?id=${this.video.id}`);
          break;
        case 1:
          await this.downloadVideo(this.video.video_url);
          break;
        case 2:
          if (await confirm('是否删除该视频?')) {
            await this.deleteVideo(this.video.id);
          }
          break;
        default:
          // do nothing
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../theme';

.video {
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid $divider-color;
  display: flex;
  align-items: flex-start;
}

.thumbnail {
  position: relative;
  width: 125px;
  height: 100px;
  margin: 0 15px 0 0;
}

.duration {
  margin-top: 0;
  margin-right: 0;
  padding: 0 4px;
  font-weight: 500;
  font-size: 15px;
  background-color: black;
  height: 25px;
  line-height: 25px;
  opacity: 0.75;
  filter: alpha(opacity=75);
  display: -moz-inline-stack;
  vertical-align: top;
  display: inline-block;
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.body {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  flex: 1;
}

.date {
  color: #767676;
  line-height: 1.3em;
}
</style>
