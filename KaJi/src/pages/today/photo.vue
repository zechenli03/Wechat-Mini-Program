<template>
  <div class="photo-container">
    <div class="photo">
      <img class="photo-content" :src="photo.photo_url" mode="aspectFill" @click="previewImage"/>
      <div class="fab-container" hover-class="none" @click="navigate" @longpress="showActionSheet">
        <fab icon="/static/icons/edit_white.png"></fab>
      </div>
    </div>
    <div class="cells">
      <div class="title">
        <img class="icon" src="/static/icons/locate.png"/>
        <span>地址</span>
      </div>
      <div class="content" :class="{ '-empty': !photo.location }">{{photo.location || '未设置'}}</div>
      <div class="title">
        <img class="icon" src="/static/icons/description.png"/>
        <span>简介</span>
      </div>
      <div class="content" :class="{ '-empty': !photo.description }">{{photo.description || '未设置'}}</div>
    </div>
  </div>
</template>

<script>
import { isToday } from 'date-fns';
import { mapActions, mapMutations } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import {
  chooseImage,
  chooseLocation,
  navigate,
  showActionSheet,
} from '../../util';

export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },

  components: {
    fab,
  },

  store,

  methods: {
    ...mapActions(['updatePhotoMeta', 'updatePhotoImage']),
    ...mapMutations(['clearEditing']),

    previewImage() {
      wx.previewImage({
        current: this.photo.photo_url,
        urls: [this.photo.photo_url],
      });
    },

    navigate() {
      navigate('/pages/photo-edit/main?id=' + this.photo.id);
    },

    async showActionSheet() {
      const sheet = isToday(this.photo.created_at)
        ? showActionSheet('重新定位', '替换照片')
        : showActionSheet('重新定位');
      switch (await sheet) {
        case 0:
          await this.updatePhotoMeta({
            id: this.photo.id,
            description: this.photo.description,
            location: await chooseLocation(),
          });
          this.clearEditing();
          break;
        case 1:
          await this.updatePhotoImage({
            id: this.photo.id,
            path: await chooseImage(),
          });
          this.clearEditing();
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

.photo {
  position: relative;
  background: white;
}

.photo-container {
  width: 320px;
  background: white;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.photo-content {
  width: 100%;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.fab-container {
  position: absolute;
  right: 10px;
  bottom: -22.5px;
}

.cells {
  font-size: 17px;
  padding: 10px;
}

.title {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: $content-color;
}

.content {
  border-bottom: 1px solid $divider-color;
  padding: 5px;
  margin-bottom: 5px;

  &.-empty {
    color: $sub-color;
  }
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
