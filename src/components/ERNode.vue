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
    <div class="er-node-title">{{ _tableName }}</div>
    <div class="er-node-divider"></div>
    <div class="er-node-content">
      <div
          v-for="(field, index) in _fields"
          :key="field.name"
          class="er-node-field"
      >
        <span class="field-name">{{ field.name }}</span>
        <span class="field-type">{{ field.type }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/variables.scss';
  .er-node {
    border: 1px solid $ERNode-border-bg-color;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    transition: box-shadow 0.3s ease; /* 过渡效果 */
    .er-node-title {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      height: $ERNode-title-height;
      line-height: $ERNode-title-height;
      background-color: $ERNode-title-bg-color;
    }
    .er-node-divider{
      height: 1px;
      background-color: $ERNode-divider-color;
    }
    .er-node-content {
      display: flex;
      flex-direction: column;
      background-color: $ERNode-content-bg-color;
      padding: 0 10px;
      .er-node-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px;
        height: $ERNode-field-height;
        .field-name {
        }
        .field-type {
        }
      }
    }
  }
</style>