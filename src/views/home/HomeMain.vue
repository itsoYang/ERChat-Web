<script setup lang="ts">

import {Ref, ref} from "vue";
import Project from "../../api/home/type.ts";
import {IHomeMainLeftItem, menus} from "../../api/home/home.ts";
import MainRight from "./MainRight.vue";
import ProjectInfo from "../../components/ProjectInfo.vue";
import ProjectList from "./ProjectList.vue";

const visible = ref(false)
const title = ref('')
// 默认点击 第一个菜单
const currentClickItem: Ref<IHomeMainLeftItem | null> = ref({
  type: 'menu',
  label: menus[0].label,
  key: menus[0].key
})

// 当前选择的菜单按钮索引
const selectedMenu: Ref<number | null> = ref(0)

// 当前选择的项目索引
const selectedProject: Ref<number | null> = ref(null);


const projectList = ref<Project[]>([])

const projectInfo: Ref<ProjectInfo | null> = ref(null)

const menuClick = (menu: any, index: number) => {
  selectedMenu.value = index
  selectedProject.value = null
  projectInfo.value = null
  if (menu.key === 'my_favorites'){
    currentClickItem.value = {
      type: 'menu',
      label: menu.label,
      key: menu.key
    }
  }else if (menu.key === 'create_project'){
    currentClickItem.value = null // 右侧刷新
    title.value = '新建项目'
    openProjectInfo(null)
  }
}
const projectClick = (project: Project) => {
  selectedMenu.value = null
  currentClickItem.value = {
    type: 'project',
    label: project.projectName,
    key: project.id
  }
}

const closeProjectInfo = (isConfirm: boolean) => {
  if (isConfirm){
    // TODO 刷新项目列表
  }
  visible.value = false
}

const openProjectInfo = (projectId: string | null) => {
  visible.value = true
  if (projectId){
    title.value = '编辑项目'
  }
}
</script>

<template>
  <div class="er-main">
    <div class="er-main-left">
      <!--  菜单列表    -->
      <div class="er-main-left-menu">
        <div class="er-menu-item"
             :style="{ backgroundColor: selectedMenu === index ? 'lightblue' : '' }"
             v-for="(menu, index) in menus"
             :key="menu.key"
             @click="menuClick(menu, index)"
        >
          <span><i class="iconfont" v-html="menu.icon"></i></span>
          <span>{{ menu.label }}</span>
        </div>
      </div>
      <div class="divider"></div>
      <!--   项目列表   -->
      <ProjectList :curProject="selectedProject" @projectClick="projectClick"></ProjectList>
    </div>
    <div class="gap"></div>
    <main-right :curClickItem="currentClickItem"></main-right>
  </div>
  <ProjectInfo v-model:visible="visible" @close="closeProjectInfo" :title="title" :projectInfo="projectInfo"/>
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
  }
}
</style>