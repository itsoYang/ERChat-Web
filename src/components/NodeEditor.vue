<script setup lang="ts">

import {getCurrentInstance, ref} from "vue";
  import {Plus, Minus, Check} from "@element-plus/icons-vue";
  import {useAddNode, useCalcNodeHeight} from "../hooks/useGraphNode.ts";
  import {MysqlFieldType} from "../constants/DataType.ts";
  import ItemList from "./ItemList.vue";
  import {useEditNodeFieldValidate} from "../hooks/useValidate.ts";

  const {appContext} = getCurrentInstance()
  const $message = appContext.config.globalProperties.$message

  const props = defineProps(['nodeEditorVisible', 'initNodeData']);

  const emit = defineEmits(['nodeEditorClose'])

  const nodeData = ref(props.initNodeData)

  const popoverVisible = ref(false)

  const fieldInputRef = ref(null)
  const popoverRef = ref(null)

  const fieldIndex = ref(0) // 当前编辑的字段索引

  const handleDlgClose = () => {
    emit('nodeEditorClose', false)
  }

  const handleMouseEnter = (e, inputValue, index) => {
    fieldIndex.value = index
    fieldInputRef.value = e.currentTarget
    console.log('handleMouseEnter', inputValue, popoverVisible.value)
    if (!popoverVisible.value && !inputValue){
      popoverVisible.value = true
    }
  }

  const handleItemClick = (item) => {
    console.log('handleItemClick', item)
    nodeData.value.fields.forEach((_item, _index) => {
      if (_index === fieldIndex.value){
        _item.type = item
      }
    })
    popoverVisible.value = false
  }

  const handleFieldTypeInput = (fieldType, index) => {
    fieldIndex.value = index
    if (!fieldType){
      popoverVisible.value = true
    }
    if (popoverVisible.value && fieldType){
      popoverVisible.value = false
    }
  }

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
    // 校验必填信息
    const {validFlag, msg, fieldType, fieldIndex} = useEditNodeFieldValidate(nodeData.value)
    if (!validFlag){
      $message.warning(msg)
      return
    }
    let nodeHeight = useCalcNodeHeight(nodeData.value.fields);
    useAddNode({x: 100, y: 100}, nodeHeight, nodeData.value)
    emit('nodeEditorClose')
  }

</script>

<template>
  <div class="node-editor">
    <el-dialog
        v-model="props.nodeEditorVisible"
        width="600"
        @close="handleDlgClose"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
      <div class="node-editor-content">
        <div class="node-editor-header">
          <div class="node-editor-header-left">
            <div class="node-editor-table-name">
              <div class="node-editor-field-prefix required">
                <span>表名：</span>
              </div>
              <el-input
                  v-model="nodeData.tableName"
                  style="width: 240px"
              />
            </div>
            <div class="node-editor-table-comment">
              <div class="node-editor-field-prefix">
                <span>描述：</span>
              </div>
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
            <el-table-column width="150">
              <template #header>
                <div class="node-editor-field-prefix required">
                  <span>字段名</span>
                </div>
              </template>
              <template #default="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column label="数据类型" width="200">
              <template #header>
                <div class="node-editor-field-prefix required" style="width: 100%;justify-content: flex-start;">
                  <span>数据类型</span>
                </div>
              </template>
              <template #default="scope">
                <el-input ref="fieldInputRef" v-model="scope.row.type" @blur="popoverVisible=false"  @focus="(e) => handleMouseEnter(e, scope.row.type, scope.$index)" @input="handleFieldTypeInput(scope.row.type, scope.$index)"/>
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
    <!-- 字段类型列表 弹出框 -->
    <el-popover :popper-style="{padding: '0'}" :visible="popoverVisible" placement="right" :virtual-ref="fieldInputRef" virtual-triggering ref="popoverRef" effect="dark">
      <ItemList :data="MysqlFieldType" @return-fieldType="handleItemClick"/>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables.scss';
  .node-editor-field-prefix.required::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .node-editor-field-prefix {
    display: flex;
    justify-content: flex-end;
    width: 55px;
  }
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