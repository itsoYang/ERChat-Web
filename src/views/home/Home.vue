<script setup lang="ts">
  import HomeHeader from "./HomeHeader.vue";
  import bgImg from "../../assets/images/bg01.png";
  import HomeMain from "./HomeMain.vue";

</script>

<template>
  <!-- 背景图 -->
  <el-image :src="bgImg" style="width: 100%;height: 100%;"  fit="fill"></el-image>
  <!-- 页面头部 -->
  <home-header></home-header>
  <!-- 页面主体 -->
  <home-main></home-main>
</template>

<style lang="scss" scoped>
  .el-image {
    //background-image: url('@/assets/images/bg01.png');
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
    background-attachment: fixed; /* 固定背景图，使其随着页面滚动 */
    background-repeat: no-repeat; /* 防止背景图重复 */
    overflow: auto; /* 确保容器可以滚动 */
    width: 100vw;
    height: 100vh;

    position: fixed;
    filter: blur(6px);
    z-index: 1;
  }

</style>