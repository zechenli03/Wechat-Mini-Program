import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth';
import { editing } from './editing';
import { settings } from './settings';
import { timeline } from './timeline';
import { videos } from './videos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    editing,
    settings,
    timeline,
    videos,
  },
});

export default store;
