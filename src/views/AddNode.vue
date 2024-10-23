<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import NodeEditor from "../components/NodeEditor.vue";
  import {ref} from "vue";

  let nodeEditorVisible = ref(false)
  let nodeData = ref({
    id: '002',
    tableName: '',
    tableComment: '',
    fields: [
      {name: 'id', type: 'char(36)', comment: ''}
    ]
  })
  const openTableConfig = () => {
    nodeEditorVisible.value = true
  }
  const handleNodeEditorClose = (data: any) => {
    nodeEditorVisible.value = data
  }

</script>

<template>
  <div class="table-editor-button" v-if="!nodeEditorVisible">
    <el-button type="primary" :icon="Plus" circle @click="openTableConfig"></el-button>
  </div>
  <NodeEditor :nodeEditorVisible="nodeEditorVisible" @nodeEditorClose="handleNodeEditorClose" :initNodeData="nodeData" />
</template>

<style scoped>
  .table-editor-button{
    position: fixed;
    left: 1vw;
    top: 6vh;
  }
</style>