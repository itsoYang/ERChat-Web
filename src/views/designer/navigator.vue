<script setup lang="ts">
  import {getCurrentInstance, ref} from 'vue'
  import NodeEditor from "../../components/NodeEditor.vue";
  import {save} from "../../api/designer/designer.ts";
  import {v4 as uuIdv4} from 'uuid';

  const {proxy} = getCurrentInstance() as any

  const props = defineProps(['diagramId'])

  let nodeEditorVisible = ref(false)
  let nodeData = ref({
    id: uuIdv4(),
    tableName: '',
    tableComment: '',
    fields: [
      {name: 'id', type: 'char(36)', comment: ''}
    ]
  })

  const handleNodeEditorClose = (data: any) => {
    nodeEditorVisible.value = data
  }

  const addERNode = () => {
    nodeEditorVisible.value = true
  }

  const saveDiagram = async () => {
    const {success,message} = await save(props.diagramId)
    if (success){
      proxy.$message({
        message: message,
        type: 'success'
      })
    }
  }

</script>

<template>
  <div class="er-navigator">
    <el-dropdown
    trigger="click"
    >
      <span class="er-navigator-menu"><i class="iconfont">&#xe605;</i></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div class="menu-item" style="width: 75px;height: 30px;display: inline-flex;justify-content: center;align-items: center;" @click="addERNode">
              <i class="iconfont">&#xe60d;</i>
              <span>新增</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="menu-item" style="width: 75px;height: 30px;display: inline-flex;justify-content: center;align-items: center;" @click="saveDiagram">
              <i class="iconfont">&#xe63b;</i>
              <span>保存</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <NodeEditor :nodeEditorVisible="nodeEditorVisible" @nodeEditorClose="handleNodeEditorClose" :initNodeData="nodeData" />
</template>

<style scoped>
  .er-navigator {
    position: fixed;
    z-index: 2;
    left: 1vw;
    top: 6vh;
    .er-navigator-menu {
      padding: 0.625rem;
      width: 2.25rem;
      height: 2.25rem;
      background-color: #f2f2f7;
      cursor: pointer;
      border-radius: 5px;
    }
  }
</style>