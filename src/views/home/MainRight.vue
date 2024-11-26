<script setup lang="ts">

import DiagramCard from "../../components/DiagramCard.vue";
import ProjectInfo from "../../components/ProjectInfo.vue";
import {onMounted, ref, watch} from "vue";


const props = defineProps(['curClickItem', 'projectId'])


const mainRightTitle = ref('')


// 新建ER图
const createERDiagram = () => {
  // TODO 传递 projectId
  window.open(`/designer?id=${props.projectId}`, '_blank')
}


watch(props.curClickItem, (newVal: any, oldVal: any) => {
  console.log('main right watch execute..', props.curClickItem)
  mainRightTitle.value = props.curClickItem.label
  if (props.curClickItem.type === 'menu'){
    if (props.curClickItem.id === 'my_favorites'){
      console.log('查询favorites')
    }
  }else if (props.curClickItem.id === 'my_projects'){
    console.log('查询项目下的 diagrams')
  }
}, {immediate: true})

</script>

<template>
  <div class="er-main-right">
    <!-- 右侧列表 -->
    <div class="er-main-right-header">
      <div>
        <span class="er-title">{{ mainRightTitle }}</span>
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
</template>

<style scoped lang="scss">
.er-main-right {
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
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
</style>