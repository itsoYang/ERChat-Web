<script setup lang="ts">

  import {ref} from "vue";
  import {Plus} from "@element-plus/icons-vue";

  const props = defineProps(['nodeEditorVisible', 'initNodeData']);

  const emit = defineEmits(['nodeEditorClose'])

  const tmpData = ref({
    tableName: 'Student',
    fields: [
      {name: 'id', type: 'varchar(36)', comment: '主键'},
      {name: 'username', type: 'varchar(36)', comment: '学生名'},
      {name: 'email', type: 'varchar(36)', comment: '邮箱'},
      {name: 'address', type: 'varchar(36)', comment: '学生地址'},
    ]
  })

  const fieldAdd = () => {

  }

  const fieldDel = () => {

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
                  v-model="props.initNodeData.tableName"
                  style="width: 240px"
              />
            </div>
            <div class="node-editor-table-comment">
              <span>描述：</span>
              <el-input
                  v-model="props.initNodeData.comment"
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
              <el-button type="primary" :icon="Plus" circle size="small" @click="fieldAdd"></el-button>
            </div>
            <div class="field-del">
              <el-button type="primary" :icon="Plus" circle size="small" @click="fieldDel"></el-button>
            </div>
          </div>
          <el-table :data="props.initNodeData.fields">
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
    }
  }
</style>