import { format } from 'date-fns';

import { confirm, request, warning, saveVideoToAlbum } from '../util';

export const videos = {
  state: {
    videos: [],
  },
  mutations: {
    videosFetched(state, videos) {
      state.videos = videos;
    },
  },
  getters: {
    getVideoById: state => id => state.videos.find(v => v.id === id),
  },
  actions: {
    fetchVideos: async ({ state, commit }) => {
      try {
        const videos = await request('videos');
        commit(
          'videosFetched',
          videos.map(video => {
            video.created_at = format(video.created_at, 'M月D日 HH:mm');
            return video;
          }),
        );
      } catch (e) {
        console.log(e);
        warning('获取视频列表失败!');
      }
    },
    deleteVideo: async ({ dispatch }, id) => {
      wx.showLoading({ title: '正在删除视频...' });

      try {
        await request('videos/' + id, 'DELETE', {});
      } catch (e) {
        console.log(e);
        warning('视频删除失败!');
      }

      await dispatch('fetchVideos', true);

      wx.hideLoading();
    },
    downloadVideo: async (context, url) => {
      try {
        await saveVideoToAlbum(url);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
