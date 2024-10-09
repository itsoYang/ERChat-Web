<script setup lang="ts">

  import {ref} from "vue";

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
</script>

<template>
  <div class="node-editor">
    <el-dialog v-model="props.nodeEditorVisible" width="800" @close="$emit('nodeEditorClose')">
      <div class="node-editor-content">
        <div class="node-editor-header">
          <div class="node-editor-table-name">
            <span>表名：</span><input v-model="props.initNodeData.tableName" />
          </div>
          <div class="node-editor-table-comment">
            <span>注释：</span><input v-model="props.initNodeData.comment" />
          </div>
        </div>
        <div class="node-editor-body">
          <el-table :data="props.initNodeData.fields">
            <el-table-column property="name" label="字段名" width="150" />
            <el-table-column property="type" label="数据类型" width="200" />
            <el-table-column property="comment" label="注释" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>