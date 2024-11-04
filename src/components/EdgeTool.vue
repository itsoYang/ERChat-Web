<script setup lang="ts">

  import {Edge} from "@antv/x6";

  const props = defineProps(['edge'])

  const setEdgeLabel = (label: string) => {
    const edge: Edge = props.edge
    edge.setLabels(label)

    edge.removeTool('edge-tool-label')
  }
</script>

<template>
  <div class="edge-label-tool">
    <div class="edge-label-tool-item" @click="setEdgeLabel('1:1')">1:1</div>
    <div class="edge-label-tool-item" @click="setEdgeLabel('1:N')">1:N</div>
    <div class="edge-label-tool-item" @click="setEdgeLabel('N:1')">N:1</div>
  </div>
</template>

<style scoped>
  .edge-label-tool {
    width: 130px;
    height: 45px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    //background-color: #1f293b;
    border-radius: 5px;
    .edge-label-tool-item {
      width: 30px;
      height: 25px;
      background-color: #94a3b8;
      color: #1e293b;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      animation: shake 1s ease-in-out infinite; /* 添加动画效果 */
    }
  }
  @keyframes jump-in {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-5px) rotate(-5deg);
    }
    40% {
      transform: translateX(5px) rotate(5deg);
    }
    60% {
      transform: translateX(-5px) rotate(-5deg);
    }
    80% {
      transform: translateX(5px) rotate(5deg);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>