<template>
  <div class="cell">
    <div class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <button form-type="submit" hover-class="none">
          <img class="cell-img" v-bind:src="img"/>
        </button>
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <button form-type="submit" hover-class="none">
          <div>{{title}}</div>
        </button>
      </div>
      <div class="weui-cell__ft">
        <Switch class="switch" :checked="checked" @change="change" color="#2d8cf0"></Switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cellSwitch',
  props: {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    onSwitchChange: {
      type: Function,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    change(e) {
      this.onSwitchChange(e.mp.detail.value);
    },
  },
};
</script>

<style lang="scss">
@import '../../theme';

.wx-switch-input {
  width: 50px !important;
  height: 30px !important;
}

.wx-switch-input::before {
  width: 49px !important;
  height: 29px !important;
}

.wx-switch-input::after {
  width: 30px !important;
  height: 29px !important;
}

.cell {
  border-bottom: 1px solid $background-color;
}

.cell-img {
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}

.switch {
  display: block;
  float: left;
}
</style>
