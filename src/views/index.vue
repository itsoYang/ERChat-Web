<script setup lang="ts">

</script>

<template>
  <div class="er-container">
    <!-- 页面头部区域 -->
    <div class="er-header">
    </div>
    <!-- 页面主体区域 -->
    <div class="er-main">
      <div class="er-main-left">
        <div>
          <el-button type="primary">创建项目</el-button>
        </div>
      </div>
      <div class="er-main-right">
        <!-- 右侧列表 -->
        <div class="er-main-right-header"></div>
        <div class="er-main-right-content">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .er-container{
    height: 100vh;
    background-color: #f7f7fb;
    .er-header {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      height: 60px;
      background-color: #8f8fa2;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      padding: 20px;
      text-align: center;
    }
    .er-main {
      .er-main-left {

      }
    }
  }
</style>