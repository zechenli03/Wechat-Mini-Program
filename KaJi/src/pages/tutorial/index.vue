<template>
  <div class="page">
    <swiper :indicator-dots="true"
            :duration="900"
            :circular="false"
            class="swiper-img">
      <swiper-item v-for="(url, index) in imgUrls" :key="index">
        <img :src="url" class="slide-image" mode="widthFix"/>
      </swiper-item>
      <swiper-item>
        <div class="container">
          <img class="logo-img shake-chunk" src="/static/picture/logo_img.jpg" mode="widthFix"/>
          <img class="logo-text" src="/static/picture/logo_text.jpg" mode="widthFix"/>
          <navigator open-type="navigateBack" class="btn">
            <span>立即开始</span>
          </navigator>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { setStorage } from '../../util';

export default {
  data() {
    return {
      imgUrls: [
        '/static/picture/introduce1.jpg',
        '/static/picture/introduce2.jpg',
        '/static/picture/introduce3.jpg',
        '/static/picture/introduce4.jpg',
      ],
    };
  },

  onShow() {
    setStorage('finishedTutorial', true);
  },
};
</script>

<style lang="scss" scoped>
@import '../../theme';

.page {
  height: 100%;
  width: 375px;
  position: fixed;
  overflow-x: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper-img {
  height: 100%;
  width: 100%;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.logo-img {
  width: 180px;
}

.logo-text {
  margin: 20px 0;
  width: 90px;
}

.btn {
  line-height: 1em;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: $primary-color;
  color: $divider-color;
  transition: background-color 0.3s;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn:before {
  content: '';

  position: absolute;
  top: 50%;
  left: 50%;

  display: block;
  width: 0;
  padding-top: 0;

  border-radius: 100%;

  background-color: rgba(236, 240, 241, 0.3);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  width: 120%;
  padding-top: 120%;
  transition: width 0.2s ease-out, padding-top 0.2s ease-out;
}

.shake-chunk {
  animation-name: shake-chunk;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes shake-chunk {
  2% {
    transform: translate(7px, 13px) rotate(0deg);
  }

  4% {
    transform: translate(9px, -6px) rotate(0deg);
  }

  6% {
    transform: translate(-1px, -4px) rotate(2deg);
  }

  8% {
    transform: translate(-13px, 15px) rotate(12deg);
  }

  10% {
    transform: translate(-1px, 5px) rotate(-8deg);
  }

  12% {
    transform: translate(-4px, 5px) rotate(-8deg);
  }

  14% {
    transform: translate(4px, -2px) rotate(10deg);
  }

  16% {
    transform: translate(8px, -6px) rotate(12deg);
  }

  18% {
    transform: translate(11px, -3px) rotate(7deg);
  }

  20% {
    transform: translate(6px, 7px) rotate(7deg);
  }

  22% {
    transform: translate(9px, 5px) rotate(11deg);
  }

  24% {
    transform: translate(1px, -5px) rotate(-14deg);
  }

  26% {
    transform: translate(2px, 8px) rotate(8deg);
  }

  28% {
    transform: translate(-12px, -12px) rotate(-11deg);
  }

  30% {
    transform: translate(1px, 14px) rotate(-8deg);
  }

  32% {
    transform: translate(-4px, -9px) rotate(14deg);
  }

  34% {
    transform: translate(0px, 9px) rotate(5deg);
  }

  36% {
    transform: translate(8px, -12px) rotate(1deg);
  }

  38% {
    transform: translate(-8px, -6px) rotate(6deg);
  }

  0%,
  40%,
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
</style>
