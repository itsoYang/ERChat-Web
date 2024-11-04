<script setup lang="ts">

  import {Edge} from "@antv/x6";
  import {ref} from "vue";

  const props = defineProps(['visible','edge'])

  const visible = ref(props.visible)

  const setEdgeLabel = (label: string) => {
    const edge: Edge = props.edge
    edge.setLabels(label)

    visible.value = false
  }
</script>

<template>
  <div class="edge-label-tool" v-if="visible">
    <div class="edge-label-tool-item" @click="setEdgeLabel('1:1')">1:1</div>
    <div class="edge-label-tool-item" @click="setEdgeLabel('1:N')">1:N</div>
    <div class="edge-label-tool-item" @click="setEdgeLabel('N:1')">N:1</div>
  </div>
</template>

<style scoped>
  .edge-label-tool {
    width: 170px;
    height: 65px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1f293b;
    .edge-label-tool-item {
      width: 30px;
      height: 26px;
      background-color: #94a3b8;
      color: #cbd5e1;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease;
      &.hovered {
        background-color: #24b8a6 /* 鼠标滑过时的背景颜色 */
      }
    }
  }
</style>