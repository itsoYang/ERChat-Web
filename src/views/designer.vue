<script setup lang="ts">
  import {onMounted} from "vue";
  import {Graph, Node} from "@antv/x6";
  import { getTeleport } from '@antv/x6-vue-shape'
  import {useRegisterERNode, useRegisterPortLayout} from "../hooks/useGraphRegister.ts";
  import { useGraphStore } from "../stores/graph.ts";
  import { useNodeClickEvent, useBlankClickEvent } from "../hooks/useEvent.ts";

  useRegisterERNode()

  useRegisterPortLayout()

  const TeleportContainer = getTeleport()

  onMounted(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      grid: true,
    });

    const graphStore = useGraphStore()

    graphStore.setGraph(graph)

    graph.enablePanning();

    const _node = graph.addNode({
      shape: 'er-node',
      x: 100,
      y: 100,
      width: 200,
      height: 300,
      data: {
        tableName: 'Users',
        fields: [
          { name: 'id', type: 'int' },
          { name: 'username', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'address', type: 'varchar' },
        ]
      }
    });

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