<template>
  <div class="fab">
    <img class="fab-img" :src="icon" >
  </div>
</template>

<script>
export default {
  name: 'fab',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.fab {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  font-size: 50px;
  text-align: center;
  line-height: 45px;
  z-index: 100;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}

.fab-img {
  width: 30px;
  height: 30px;
}
</style>
