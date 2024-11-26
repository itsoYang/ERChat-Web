<script setup lang="ts">

import DiagramCard from "../../components/DiagramCard.vue";
import {onMounted, ref} from "vue";
import Project from "../../api/project/type.ts";
import {getProjectList} from "../../api/project";
import ProjectInfo from "../../components/ProjectInfo.vue";
import NoProject from "../../assets/images/NoProject.svg";

const visible = ref(false)
const title = ref('新建项目')

// TODO test为测试用 待删除
const projectId = ref('test')

const projectList = ref<Project[]>([])

const openProjectInfo = () => {
  visible.value = true
}

// 新建ER图
const createERDiagram = () => {
  // TODO 传递 projectId
  window.open(`/designer?id=${projectId.value}`, '_blank')
}

onMounted(async () => {
  const {success, data} = await getProjectList()
  if (success){
    console.log('项目列表',data)
    projectList.value = data as Project[]
    console.log(projectList.value)
  }
})
</script>

<template>
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
        <div v-if="projectList.length" class="er-project-item" v-for="project in projectList" :key="project.id" @click="projectId = project.id">
          <span><i class="iconfont">&#xe634;</i></span>
          <span>{{ project.projectName }}</span>
        </div>
        <el-empty v-else :image="NoProject" description="暂无项目"></el-empty>
      </div>
    </div>
    <div class="gap"></div>
    <div class="er-main-right">
      <!-- 右侧列表 -->
      <div class="er-main-right-header">
        <div>
          <span class="er-title">项目列表</span>
        </div>
        <div class="gap"></div>
        <div>
          <el-button type="primary" @click="createERDiagram">新建ER图</el-button>
        </div>
      </div>
      <div class="er-main-right-content">
        <div class="diagram-card-container">
          <diagram-card title="sss" content="哈哈哈哈"></diagram-card>
          <diagram-card title="sss" content="哈哈哈哈"></diagram-card>
          <diagram-card title="sss" content="哈哈哈哈"></diagram-card>
          <diagram-card title="sss" content="哈哈哈哈"></diagram-card>
          <diagram-card title="sss" content="哈哈哈哈"></diagram-card>
        </div>
      </div>
    </div>
  </div>
  <ProjectInfo v-model:visible="visible" @close="visible = false" :title="title"/>
</template>

<style scoped lang="scss">
.er-main {
  position: relative;
  z-index: 2;
  width: 75vw;
  margin: 30px auto auto;
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
        border-radius: 5px;
        padding: 5px 0;
        display: inline-block;
        cursor: pointer;
        span:first-child{
          margin-right: 5px;
        }
      }
      .er-menu-item:hover{
        background-color: #e6e6e6;
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
  .er-main-right {
    display: flex;
    flex-direction: column;
    height: 85vh;
    overflow: auto;
    .er-main-right-header {
      height: 75px;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 5fr 2fr;
      justify-content: space-between;
      align-items: center;
      div:first-child{
        margin: auto;
        font-size: 20px;
      }
      div:last-child{
        margin: auto;
      }
    }
    .er-main-right-content {
      height: calc(85vh - 75px);
      .diagram-card-container {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>