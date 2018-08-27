<template>
  <button form-type="submit">
    <div class="user-info">
      <open-data class="avatar" type="userAvatarUrl"></open-data>
      <open-data type="userNickName" lang="zh_CN"></open-data>
    </div>
  </button>
</template>

<script>
export default {
  name: 'userInfo',
};
</script>

<style lang="scss" scoped>
@import '../../theme';

.user-info {
  color: white;
  padding-bottom: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $primary-color;
}

.avatar {
  margin-top: 20px;
  width: 75px;
  height: 75px;
  margin-bottom: 15px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  float: left;
  overflow: hidden;
}
</style>
