export const auth = {
  state: {
    jwt: null,
  },
  mutations: {
    setJWT(state, jwt) {
      state.jwt = jwt;
      try {
        wx.setStorageSync('jwt', jwt);
      } catch (e) {
        // TODO: handle error
      }
    },
  },
};
