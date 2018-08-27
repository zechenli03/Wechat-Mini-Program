import config from '../config';

/** promisify wx.request api */
export const request = (path, method, data, headers = {}) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url: config.api_url + path,
      header: {
        ...headers,
        'content-type': 'application/json',
      },
      success: res => {
        if (res.statusCode !== 200) {
          reject('Request Failed with status code' + res.statusCode);
        } else {
          resolve(res.data);
        }
      },
      fail: err => {
        reject('Network Failed: ' + err);
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.uploadFile api */
export const upload = (path, filePath, formData, headers = {}) => {
  wx.showNavigationBarLoading();
  wx.showLoading({ title: '正在上传...' });
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      formData,
      filePath,
      url: config.api_url + path,
      name: 'photo',
      header: {
        ...headers,
        'content-type': 'multipart/form-data',
      },
      success: res => {
        if (res.statusCode !== 200) {
          warning('上传失败!');
          reject('Request Failed with status code' + res.statusCode);
        } else {
          resolve(res.data);
        }
      },
      fail: err => {
        warning('上传失败!');
        reject('Network Failed: ' + err);
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.login api */
export const login = () => {
  wx.showNavigationBarLoading();
  wx.showLoading({ title: '正在登录...' });
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          resolve(res.code);
        } else {
          warning('登录失败!');
          reject('Login Failed');
        }
      },
      fail: () => {
        warning('登录失败!');
        reject('Login Failed');
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.getStorage api */
export const getStorage = key => {
  wx.showNavigationBarLoading();
  return new Promise(resolve => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data);
      },
      fail: () => {
        resolve(null);
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.setStorage api */
export const setStorage = (key, data) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: () => {
        resolve(data);
      },
      fail: () => {
        reject('Set Storage Error');
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

export const navigate = url =>
  new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Navigate Error' + JSON.stringify(err));
      },
    });
  });

export const switchTab = url =>
  new Promise((resolve, reject) => {
    wx.switchTab({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Switch Tab Error' + JSON.stringify(err));
      },
    });
  });

export const toast = (content, icon = 'none') =>
  wx.showToast({
    duration: 1500,
    title: content,
    icon,
  });

export const confirm = (content, title = '请确认') =>
  new Promise((resolve, reject) => {
    wx.showModal({
      content,
      title,
      showCancel: true,
      success: res => {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      },
      fail: err => {
        reject('Show Modal Error' + JSON.stringify(err));
      },
    });
  });

export const warning = (content, title = '错误') =>
  wx.showModal({
    content,
    title,
    showCancel: false,
  });

export const chooseLocation = () =>
  new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        const userLocation =
          typeof res.authSetting['scope.userLocation'] !== 'undefined'
            ? res.authSetting['scope.userLocation']
            : true;
        if (userLocation) {
          wx.chooseLocation({
            success: res => {
              resolve(res.address);
            },
            fail: err => {
              warning('请检查是否开启了位置权限', '获取位置失败!');
              reject('Choose Location Error' + JSON.stringify(err));
            },
          });
        } else {
          warning('请检查是否开启了位置权限', '无权限');
        }
      },
      fail: err => {
        warning('获取用户权限失败!');
        reject('Get Settings Error' + JSON.stringify(err));
      },
    });
  });

export const chooseImage = () =>
  new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: res => {
        resolve(res.tempFilePaths[0]);
      },
      fail: err => {
        reject('Choose Image Error' + JSON.stringify(err));
      },
    });
  });

export const redirect = url =>
  new Promise((resolve, reject) => {
    wx.redirectTo({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Redirect Error' + JSON.stringify(err));
      },
    });
  });

export const saveVideoToAlbum = url => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        const writePhotosAlbum =
          typeof res.authSetting['scope.writePhotosAlbum'] !== 'undefined'
            ? res.authSetting['scope.writePhotosAlbum']
            : true;
        if (writePhotosAlbum) {
          wx.showNavigationBarLoading();
          wx.showLoading({ title: '正在下载...' });
          wx.downloadFile({
            url,
            success: res => {
              if (res.statusCode === 200) {
                wx.saveVideoToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: () => {
                    toast('下载成功', 'success');
                    resolve();
                  },
                  fail: res => {
                    reject('Save Video Failed: ' + JSON.stringify(res));
                  },
                });
              } else {
                warning('下载失败!');
                reject('Download File Failed.');
              }
            },
            fail: res => {
              warning('下载失败!');
              reject('Download File Failed: ' + JSON.stringify(res));
            },
            complete: () => {
              wx.hideLoading();
              wx.hideNavigationBarLoading();
            },
          });
        } else {
          warning('请检查是否开启了保存到相册权限', '无权限');
        }
      },
      fail: err => {
        warning('获取用户权限失败!');
        reject('Get Settings Error' + JSON.stringify(err));
      },
    });
  });
};

export const showActionSheet = (...itemList) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList,
      success: res => {
        resolve(res.tapIndex);
      },
      fail: res => {
        reject('Show ActionSheet Failed' + res.errMsg);
      },
    });
  });
};
