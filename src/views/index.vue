<script setup lang="ts">

  import {ref} from "vue";

  const logoUrl = ref('')


</script>

<template>
  <div class="er-container">
    <!-- 页面头部区域 -->
    <div class="er-header">
      <div>
        <img style="width: 100px; height: 100px" src="@/assets/logo/trans_bg.png" fit="fill" />
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
        <div class="er-main-left-menu">
          <div class="er-menu-item">
            <span><i class="iconfont">&#xe640;</i></span>
            <span>我的收藏</span>
          </div>
          <div class="er-menu-item">
            <span><i class="iconfont">&#xe6e9;</i></span>
            <span>创建项目</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="er-main-left-project">
          <div class="er-project-item">
            <div class="er-project-item-title">
              <div class="er-project-item-title-icon">
                <i class="iconfont">&#xe6e9;</i>
              </div>
              <div class="er-project-item-title-text">
                <div>项目1</div>
                <div>项目描述</div>
              </div>
            </div>
            <div class="er-project-item-content"></div>
          </div>
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
      div:first-child{
        background-image: url("@/assets/logo/trans_bg.png");
      }
    }
    .er-main {
      width: 75vw;
      margin: 90px auto auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      height: 85vh;
      display: grid;
      grid-template-columns: 1.5fr 0.2fr 3.5fr;
      .er-main-left,.er-main-right {
        border-radius: 5px;
        background-color: #24b8a6;
      }
      .er-main-left {
        display: grid;
        grid-template-rows: 200px 0.5fr 10fr;
        padding: 15px;
        .er-main-left-menu {
          display: grid;
          grid-template-rows: 1fr 1fr 5fr;
          .er-menu-item {
            margin: 5px 0;
            display: inline-block;
            cursor: pointer;
            span:first-child{
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>