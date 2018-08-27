import { isToday } from 'date-fns';

export const editing = {
  state: {
    original: null,
    photo_url: null,
    description: null,
    location: null,
  },
  mutations: {
    setPhotoUrl(state, photo_url) {
      state.photo_url = photo_url;
    },
    setDescription(state, description) {
      state.description = description;
    },
    setLocation(state, location) {
      state.location = location;
    },
    clearEditing(state) {
      state.original = null;
      state.photo_url = null;
      state.description = null;
      state.location = null;
    },
    setEditing(state, photo) {
      state.original = photo;
      state.photo_url = photo.photo_url;
      state.description = photo.description;
      state.location = photo.location;
    },
  },
  getters: {
    photoEditable: state => {
      return !state.original || isToday(state.original.created_at);
    },
    wordCount: state => {
      return state.description ? state.description.length : 0;
    },
    formData: state => {
      const res = {};
      if (state.description) {
        res.description = state.description;
      }
      if (state.location) {
        res.location = state.location;
      }
      return res;
    },
  },
};
