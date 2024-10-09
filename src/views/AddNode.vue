<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import NodeEditor from "../components/NodeEditor.vue";
  import {ref} from "vue";

  let nodeEditorVisible = ref(false)
  let nodeData = ref({
    tableName: '',
    tableComment: '',
    fields: [
      {name: 'id', type: 'char(36)', comment: ''}
    ]
  })
  const openTableConfig = () => {
    nodeEditorVisible.value = true
  }

</script>

<template>
  <div class="table-editor-button" v-if="!nodeEditorVisible">
    <el-button type="primary" :icon="Plus" circle @click="openTableConfig"></el-button>
  </div>
  <NodeEditor :nodeEditorVisible="nodeEditorVisible" @nodeEditorClose="nodeEditorVisible=false" :initNodeData="nodeData" />
</template>

<style scoped>
  .table-editor-button{
    position: fixed;
    left: 1vw;
    top: 6vh;
  }
</style>