<script setup lang="ts">
import {inject, onMounted, ref} from "vue";

  const getNodeFn = inject('getNode');

  let _tableName = ref('')
  let _fields = ref([])

  onMounted(() => {
    const node = getNodeFn();
    const { tableName, fields }  = node.getData();
    _tableName.value = tableName
    _fields.value = fields

    node.on('change:data', ({ current }) => {
      const { tableName, fields } = current
      _tableName.value = tableName
      _fields.value = fields
    })

  })


</script>

<template>
  <div class="er-node">
    <div class="table-name">{{ _tableName }}</div>
    <div class="fields">
      <div
          v-for="(field, index) in _fields"
          :key="field.name"
          class="field"
      >
        <span class="field-name">{{ field.name }}</span>
        <span class="field-type">{{ field.type }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .er-node {
    border: 1px solid #5F95FF;
    border-radius: 5px;
    background-color: #EFF4FF;
    padding: 10px;
  }

  .table-name {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .fields {
    display: flex;
    flex-direction: column;
  }

  .field {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }

  .field-name {
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
  }

  .field-type {
    font-style: italic;
  }
</style>