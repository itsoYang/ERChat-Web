<script setup lang="ts">

  import {ref} from "vue";
  import {Plus, Minus, Check} from "@element-plus/icons-vue";
  import {useAddNode, useCalcNodeHeight} from "../hooks/useGraphNode.ts";

  const props = defineProps(['nodeEditorVisible', 'initNodeData']);

  const emit = defineEmits(['nodeEditorClose'])

  const nodeData = ref(props.initNodeData)

  const fieldAdd = () => {
    nodeData.value.fields.push({
      name: '',
      type: '',
      comment: ''
    })
  }

  const fieldDel = (index) => {
    nodeData.value.fields.splice(index, 1)
  }

  const saveNodeData = () => {
    let nodeHeight = useCalcNodeHeight(nodeData.value.fields);
    useAddNode({x: 100, y: 100}, nodeHeight, nodeData.value)
    emit('nodeEditorClose')
  }

</script>

<template>
  <div class="node-editor">
    <el-dialog v-model="props.nodeEditorVisible" width="600" @close="$emit('nodeEditorClose')">
      <div class="node-editor-content">
        <div class="node-editor-header">
          <div class="node-editor-header-left">
            <div class="node-editor-table-name">
              <span>表名：</span>
              <el-input
                  v-model="nodeData.tableName"
                  style="width: 240px"
              />
            </div>
            <div class="node-editor-table-comment">
              <span>描述：</span>
              <el-input
                  v-model="nodeData.tableComment"
                  style="width: 240px"
                  :rows="2"
                  type="textarea"
              />
            </div>
          </div>
          <div class="node-editor-header-right"></div>
        </div>
        <el-divider/>
        <div class="node-editor-body">
          <div class="field-operator">
            <div class="field-add">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="增加字段"
                  placement="bottom"
              >
                <el-button type="primary" :icon="Plus" circle size="small" @click="fieldAdd"></el-button>
              </el-tooltip>
            </div>
            <div class="field-del">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="完成"
                  placement="bottom"
              >
                <el-button type="primary" :icon="Check" circle size="small" @click="saveNodeData"></el-button>
              </el-tooltip>
            </div>
          </div>
          <el-table :data="nodeData.fields">
            <el-table-column label="字段名" width="150">
              <template #default="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column label="数据类型" width="200">
              <template #default="scope">
                <el-input v-model="scope.row.type" />
              </template>
            </el-table-column>
            <el-table-column label="注释">
              <template #default="scope">
                <el-input v-model="scope.row.comment" />
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template #default="scope">
                <el-button type="danger" :icon="Minus" circle size="small" @click="fieldDel(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables.scss';
  .node-editor-header {
    display: grid;
    flex-direction: column;
    grid-template-columns: 60% 40%;
    .node-editor-table-name {
      @include node-editor-table-item;
    }
    .node-editor-table-comment {
      @include node-editor-table-item;
    }
  }
  .node-editor-body {
    .field-operator {
      display: flex;
      justify-content: flex-end;
      padding: 0 10px;
      gap: 1rem;
      .el-button--small.is-circle {
       @include node-editor-button-size;
      }
    }
    .el-button--small.is-circle {
      @include node-editor-button-size;
    }
  }
</style>