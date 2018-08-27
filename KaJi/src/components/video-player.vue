<template>
  <div class="video-player">
    <div class="video-container">
      <video class="video" id="video" :src="video.video_url" :poster="video.thumbnail_url"></video>
    </div>
    <div class="weui-cells video-content">
      <h2 class="title" :class="{'-empty': !video.name}">{{video.name || '未命名'}}</h2>
      <h3 class="subtitle">{{video.created_at}} | {{video.length}}s</h3>
      <p class="description" :class="{'-empty': !video.description}">{{video.description || '没有视频描述'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-player',

  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../theme';

.video-player {
  width: 100%;
}

.video-container {
  width: 100%;
  height: 213px;

  .video {
    height: 100%;
    width: 100%;
  }
}

.video-content {
  width: calc(100% - 30px);
  margin: 0;
  padding: 10px 15px;
  position: relative;

  > .title {
    color: $title-color;
    font-size: 20px;

    &.-empty {
      color: $sub-color;
      font-style: italic;
    }
  }

  > .subtitle {
    color: $title-color;
    font-size: 15px;
  }

  > .description {
    padding-top: 10px;
    color: $content-color;

    &.-empty {
      color: $sub-color;
      font-style: italic;
    }
  }
}
</style>
