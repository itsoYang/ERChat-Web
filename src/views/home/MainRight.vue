<script setup lang="ts">

import DiagramCard from "../../components/DiagramCard.vue";
import { Ref, ref, watch } from "vue";
import {loadDiagramsByProjectId, loadMyFavorites} from "../../api/home/home.ts";
import NoDiagram from "../../assets/images/NoDiagram.svg"
import EREmpty from "../../components/EREmpty.vue";

const props = defineProps(['curClickItem'])

const mainRightTitle = ref('')
const projectId: Ref<string | null> = ref(null)
const diagrams: Ref<any[] | null> = ref(null)

// 新建ER图
const createERDiagram = () => {
  // 创建
  window.open(`/designer?id=${props.curClickItem.key}`, '_blank')
}


watch(() => props.curClickItem, (newVal: any, oldVal: any) => {
  console.log('main right watch execute..', props.curClickItem)
  projectId.value = null
  if (newVal){
    mainRightTitle.value = props.curClickItem.label
    if (props.curClickItem.type === 'menu'){
      if (props.curClickItem.key === 'my_favorites'){
        const {data} = loadMyFavorites()
        if (!data){
          let _data = []
          for (let i = 0; i < 5; i++) {
            let obj = {title: `00${i + 1}`, content: `diagrams: ${i+1}`}
            _data.push(obj)
          }
          diagrams.value = _data
        }
      }
    }else if (props.curClickItem.type === 'project'){
      console.log('查询项目下的 diagrams')
      projectId.value = props.curClickItem.key
      const { data } = loadDiagramsByProjectId(projectId.value)
      diagrams.value = data
    }
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
        <el-button v-if="projectId" type="primary" @click="createERDiagram">新建ER图</el-button>
      </div>
    </div>
    <div class="er-main-right-content">
      <div
          class="diagram-card-container"
          v-if="diagrams"
      >
        <diagram-card
            v-for="diagram in diagrams"
            :title="diagram.title"
            :content="diagram.content"
            :key="diagram.title"
        >
        </diagram-card>
      </div>
      <EREmpty
          v-else
          :image="NoDiagram"
          desc="暂无数据"
      ></EREmpty>
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