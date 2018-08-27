<template>
  <div class="img-container">
    <img :src="src" class="img" :class="{ 'shake-chunk': imgShake }"/>
    <button v-if="text" :style="{ color: textColor }">{{text}}</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'bigImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    imgShake: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    textColor: {
      type: String,
      default: '#000',
    },
  },
};
</script>

<style scoped>
.img {
  width: 140px;
  height: 140px;
}

.img-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

button,
button::after {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  text-align: center;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
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
