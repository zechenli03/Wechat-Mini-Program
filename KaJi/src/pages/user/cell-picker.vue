<template>
  <picker @change="change" :value="value" :range="range">
    <button form-type="submit" hover-class="button-hover">
      <div class="weui-cell weui-cell_access cell">
        <div class="weui-cell__hd">
          <img class="cell-img" v-bind:src="img"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div>{{title}}</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access">{{range[value]}}</div>
      </div>
    </button>
  </picker>
</template>

<script>
export default {
  name: 'cellPicker',
  props: {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    onPickerChange: {
      type: Function,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    range: {
      type: Array,
      required: true,
    },
  },
  methods: {
    change(e) {
      this.onPickerChange(e.mp.detail.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../theme';

.cell {
  border-bottom: 1px solid $background-color;
}

.cell-img {
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
</style>
