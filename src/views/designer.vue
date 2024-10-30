<script setup lang="ts">
  import {onMounted} from "vue";
  import {Graph} from "@antv/x6";
  import { getTeleport } from '@antv/x6-vue-shape'
  import { useRegisterERNode, useRegisterPortLayout, useRegisterArrow } from "../hooks/useGraphRegister.ts";
  import { useGraphStore } from "../stores/graph.ts";
  import { useNodeClickEvent, useBlankClickEvent, useNodeMovingEvent} from "../hooks/useGraphEvent.ts";
  import {useAddNode, useCalcNodeHeight} from "../hooks/useGraphNode.ts";
  import {INodeData} from "../types/graphTypes.ts";

  useRegisterERNode()
  useRegisterPortLayout()
  useRegisterArrow()

  const TeleportContainer = getTeleport()

  onMounted(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      grid: true,
      connecting: {
        allowNode: false,
        allowPort: true,
        allowMulti: true,
        connector: 'rounded',
        router: 'manhattan',
        connectionPoint: 'anchor',
      }
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
    useAddNode({x: 100, y: 100}, nodeHeight, nodeData)
    useAddNode({x: 300, y: 300}, nodeHeight, nodeData)

    useNodeClickEvent()
    useBlankClickEvent()
    useNodeMovingEvent()

    graph.addEdge({
      source: { x: 160, y: 40 },
      target: { x: 420, y: 40 },
      attrs: {
        line: {
          stroke: '#31d0c6',
          sourceMarker: {
            name: 'image',
            imageUrl: 'public/images/arrow/left.png',
            imageWidth: 24,
            imageHeight: 24,
            y: -12,
            opacity: 0.5,
          },
          targetMarker: {
            name: 'image',
            imageUrl: '/public/images/arrow/right.png',
            imageWidth: 24,
            imageHeight: 24,
            y: -12,
            opacity: 0.5,
          },
        },
      },
    })
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