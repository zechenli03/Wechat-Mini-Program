<template>
  <li @click="preview" @longpress="actionSheet" class="item" :style="{ backgroundImage: photo.photo_url ? 'url(' + photo.photo_url + '/thumbnail)' : '' }">
    <span class="dot"></span>
    <div class="time">
      <p>{{date}}</p>
      <p>{{time}}</p>
    </div>
    <div class="shadow" v-if="photo.description">
      {{photo.description}}
    </div>
  </li>
</template>

<script>
import format from 'date-fns/format';
import { mapMutations } from 'vuex';

import store from '../../store';
import { showActionSheet, switchTab, navigate } from '../../util';

export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      date: format(this.photo.created_at, 'M 月 D 日'),
      time: format(this.photo.created_at, 'HH : mm'),
    };
  },

  store,

  methods: {
    ...mapMutations(['setSelectedPhoto']),

    preview() {
      wx.previewImage({
        current: this.photo.photo_url,
        urls: [this.photo.photo_url],
      });
    },

    async actionSheet() {
      switch (await showActionSheet('在 "今日" 中查看', '跳转至编辑页面')) {
        case 0:
          this.setSelectedPhoto(this.photo);
          switchTab('/pages/today/main');
          break;
        case 1:
          navigate('/pages/photo-edit/main?id=' + this.photo.id);
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

.item {
  /* 375px - 180px */
  height: 215px;
  position: relative;
  border-radius: 10px;
  margin: 0 0 30px 60px;
  width: calc(100% - 90px);
  background-size: cover;
  background-position: center center;
}

.dot {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: -28.5px;
}

.dot:before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $primary-color;
  border: 2px solid white;
  position: absolute;
  left: -6px;
  top: -10px;
}

.shadow {
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  overflow: scroll;
  max-height: 2em;
}

.time {
  position: absolute;
  left: -100px;
  color: white;
  font-size: 80%;
  font-weight: bold;
  top: -15px;
  text-align: center;
}
</style>
