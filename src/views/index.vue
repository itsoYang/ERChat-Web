<script setup lang="ts">

</script>

<template>
  <div class="er-container">
    <!-- 页面头部区域 -->
    <div class="er-header">
      <div>
        logo
      </div>
      <div>
        搜索区域
      </div>
      <div>
        个人信息
      </div>
    </div>
    <!-- 页面主体区域 -->
    <div class="er-main">
      <div class="er-main-left">
        <div>
          <el-button type="primary">创建项目</el-button>
        </div>
      </div>
      <div class="gap"></div>
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
    background-image: url('@/assets/images/bg01.png');
    height: 100vh;
    background-color: #f7f7fb;
    display: flex;
    flex-direction: column;
    .er-header {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      width: 75vw;
      height: 60px;
      background-color: #8f8fa2;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      padding: 10px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        flex: 1;
      }
    }
    .er-main {
      width: 75vw;
      margin: 70px auto auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      //background-color: #24b8a6;
      height: 85vh;
      display: grid;
      grid-template-columns: 1.5fr 0.2fr 3.5fr;
      .er-main-left,.er-main-right {
        border-radius: 5px;
        background-color: #24b8a6;
      }
    }
  }
</style>