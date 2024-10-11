<script setup lang="ts">
  import {onMounted} from "vue";
  import {Graph} from "@antv/x6";
  import { getTeleport } from '@antv/x6-vue-shape'
  import { useRegisterERNode, useRegisterPortLayout } from "../hooks/useGraphRegister.ts";
  import { useGraphStore } from "../stores/graph.ts";
  import { useNodeClickEvent, useBlankClickEvent } from "../hooks/useGraphEvent.ts";
  import {useAddNode, useCalcNodeHeight} from "../hooks/useGraphNode.ts";
  import {INodeData} from "../types/graphTypes.ts";

  useRegisterERNode()

  useRegisterPortLayout()

  const TeleportContainer = getTeleport()

  onMounted(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      grid: true,
    });

    graph.enablePanning();

    const graphStore = useGraphStore()
    graphStore.setGraph(graph)

    // TODO 测试 待删除
    let nodeData: INodeData = {
      id: '001',
      tableName: 'Users',
      tableComment: '用户表',
      fields: [
        { name: 'id', type: 'int' , comment: '用户id'},
        { name: 'username', type: 'varchar' , comment: '用户名'},
        { name: 'email', type: 'varchar' , comment: '用户邮箱'},
        { name: 'address', type: 'varchar' , comment: '用户地址'},
      ]
    }
    let nodeHeight = useCalcNodeHeight(nodeData.fields);
    console.log('初始添加节点测试', nodeData, nodeHeight)
    useAddNode({x: 100, y: 100}, nodeHeight, nodeData)

    useNodeClickEvent()
    useBlankClickEvent()
  })


</script>

<template>
  <div id="container" class="x6-graph-container"></div>
  <TeleportContainer />
</template>

<style scoped>
.x6-graph-container {
  border: 1px solid #ddd;
}
</style>