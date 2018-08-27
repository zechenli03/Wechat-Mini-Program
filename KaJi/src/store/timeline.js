import { request, upload, warning } from '../util';
import { format, isSameDay, min, startOfMonth } from 'date-fns';

export const timeline = {
  state: {
    selected: {
      photo: null,
      date: new Date(),
    },
    photos: [],
  },
  mutations: {
    photosFetched(state, photos) {
      state.photos = photos;
    },
    setSelectedPhoto(state, photo) {
      state.selected = {
        photo,
        date: photo.created_at,
      };
    },
    setSelectedDate(state, date) {
      state.selected = {
        date,
        photo: state.photos.find(p => isSameDay(date, p.created_at)),
      };
    },
  },
  getters: {
    getPhotoById: state => id => state.photos.find(p => p.id === id),
    selectedDate: state => format(state.selected.date, 'YYYY/MM/DD'),
    firstMonthInTimeline: state =>
      startOfMonth(min(...state.photos.map(p => p.created_at), new Date())),
  },
  actions: {
    fetchPhotos: async ({ state, commit }) => {
      try {
        const photos = await request('timeline');
        commit('photosFetched', photos);
        // don't forget to update the selected photo as well
        commit('setSelectedDate', state.selected.date);
      } catch (e) {
        console.log(e);
        warning('获取时间轴失败!');
      }
    },
    updatePhotoMeta: async ({ dispatch }, { id, description, location }) => {
      wx.showLoading({ title: '正在更新...' });

      try {
        await request(`timeline/${id}/meta`, 'PUT', {
          description,
          location,
        });
      } catch (e) {
        console.log(e);
        warning('更新照片信息失败!');
      }

      await dispatch('fetchPhotos');

      wx.hideLoading();
    },
    updatePhotoImage: async ({ dispatch }, { id, path }) => {
      wx.showLoading({ title: '正在更新...' });

      try {
        await upload(`timeline/${id}/photo`, path);
      } catch (e) {
        console.log(e);
        warning('更新照片信息失败!');
      }

      await dispatch('fetchPhotos');

      wx.hideLoading();
    },
  },
};
