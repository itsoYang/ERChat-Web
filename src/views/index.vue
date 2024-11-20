<script setup lang="ts">

  import {onMounted, ref} from "vue";
  import ProjectInfo from "../components/ProjectInfo.vue";
  import {getProjectList} from "../api/project";
  import Project from "../api/project/type.ts";


  const visible = ref(false)
  const title = ref('新建项目')

  const projectList = ref<Project[]>([])

  const openProjectInfo = () => {
    visible.value = true
  }

  onMounted(async () => {
    const {success, data} = await getProjectList()
    if (success){
      console.log('项目列表',data)
      projectList.value = data
      console.log(projectList.value)
    }
  })


</script>

<template>
  <div class="er-bg"></div>
  <div class="er-container">
    <!-- 页面头部区域 -->
    <div class="er-header">
      <div>
        <img style="width: 100px; height: 100px" src="@/assets/logo/trans_bg.png" />
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
          <div class="er-menu-item" @click="openProjectInfo">
            <span><i class="iconfont">&#xe6e9;</i></span>
            <span>创建项目</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="er-main-left-project">
          <div class="er-project-item" v-for="project in projectList" :key="project.id">
            <span><i class="iconfont">&#xe634;</i></span>
            <span>{{ project.projectName }}</span>
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
  <ProjectInfo v-model:visible="visible" @close="visible = false" :title="title"/>
</template>

<style lang="scss" scoped>
  .er-bg {
    background-image: url('@/assets/images/bg01.png');
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
    background-attachment: fixed; /* 固定背景图，使其随着页面滚动 */
    background-repeat: no-repeat; /* 防止背景图重复 */
    overflow: auto; /* 确保容器可以滚动 */

    position: fixed;
    width: 100vw;
    height: 100vh;
    filter: blur(6px);
    z-index: 1;
  }
  .er-container{
    position: relative;
    z-index: 2;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .er-header {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      width: 75vw;
      height: 60px;
      background-color: rgba(255, 255, 255, 0.7); /* 半透明背景 */
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
        //background-color: #24b8a6;
        background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
      }
      .er-main-left {
        display: grid;
        grid-template-rows: 200px 0fr 10fr;
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
        .divider {
          height: 1px;
          border: 1px solid #ccc;
          margin: 15px 0;
        }
        .er-main-left-project {
          display: flex;
          flex-direction: column;
          .er-project-item {
            border-radius: 5px;
            padding: 5px 0;
            display: inline-block;
            cursor: pointer;
            span:first-child{
              margin-right: 5px;
            }
          }
          .er-project-item:hover{
            background-color: #e6e6e6;
          }
        }
      }
    }
  }


</style>