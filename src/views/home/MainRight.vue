<script setup lang="ts">

import DiagramCard from "../../components/DiagramCard.vue";
import { Ref, ref, watch } from "vue";
import {loadMyFavorites} from "../../api/home/home.ts";
import {queryDiagramsByProjectId} from "../../api/home/diagram.ts"
import NoDiagram from "../../assets/images/NoDiagram.svg"
import EREmpty from "../../components/EREmpty.vue";
import DiagramCreate from "./DiagramCreate.vue";
import {useRouter} from "vue-router";

const props = defineProps(['curClickItem'])
const router = useRouter()

const mainRightTitle = ref('')
const projectId: Ref<string | null> = ref(null)
const diagrams: Ref<any[] | null> = ref(null)

// 新建ER图
const createERDiagram = () => {
  // 创建
  window.open(`/designer?id=${props.curClickItem.key}`, '_blank')
}

const diagramCreateDlg = ref({
  visible: false,
  title: ''
})
const openDiagramCreateDlg = () => {
  diagramCreateDlg.value.visible = true
  diagramCreateDlg.value.title = '新建ER图'
}
const closeDiagramCreateDlg = (diagramId: string) => {
  diagramCreateDlg.value.visible = false
  diagramCreateDlg.value.title = ''
  if (diagramId){
    router.push({name: 'designer', params: {diagramId}})
  }
}


watch(() => props.curClickItem, async (newVal: any, oldVal: any) => {
  projectId.value = null
  if (newVal){
    mainRightTitle.value = props.curClickItem.label
    diagrams.value = null
    if (props.curClickItem.type === 'menu'){
      if (props.curClickItem.key === 'my_favorites'){
        await loadMyFavorites()
      }
    }else if (props.curClickItem.type === 'project'){
      projectId.value = props.curClickItem.key
      const { data } = await queryDiagramsByProjectId(projectId.value)
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
        <el-button v-if="projectId" type="primary" @click="openDiagramCreateDlg">新建ER图</el-button>
      </div>
    </div>
    <div class="er-main-right-content">
      <div
          class="diagram-card-container"
          v-if="diagrams && diagrams.length"
      >
        <diagram-card
            v-for="diagram in diagrams"
            :title="diagram.name"
            :content="diagram.name"
            :key="diagram.title"
            :diagramId="diagram.id"
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
  <DiagramCreate
      v-if="props.curClickItem"
      :visible="diagramCreateDlg.visible"
      :title="diagramCreateDlg.title"
      @close="closeDiagramCreateDlg"
      :projectId="props.curClickItem.key"
  ></DiagramCreate>
</template>

<style scoped lang="scss">
.er-main-right {
  display: flex;
  flex-direction: column;
  height: 85vh;
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
    overflow: auto;
    .diagram-card-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>