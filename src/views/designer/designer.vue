<script setup lang="ts">
  import {onMounted, Ref, ref} from "vue";
  import { Graph, Shape } from "@antv/x6";
  import { getTeleport } from '@antv/x6-vue-shape'
  import { useGraphRegister } from "../../hooks/useGraphRegister.ts";
  import { useGraphStore } from "../../stores/graph.ts";
  import { useGraphEvent } from "../../hooks/useGraphEvent.ts";
  import {useRoute} from "vue-router";
  import Navigator from "./navigator.vue";

  const route = useRoute();
  const diagramId: Ref<string | null> = ref(null)

  // 注册相关
  useGraphRegister()

  const TeleportContainer = getTeleport()

  onMounted(() => {

    // 初始化画布
    const graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      grid: true,
      connecting: {
        snap: {
          radius: 5,
        },
        allowBlank: false,
        allowNode: false,
        allowEdge: false,
        allowLoop: false,
        allowPort: true,
        allowMulti: true,
        connector: 'rounded',
        router: 'manhattan',
        connectionPoint: 'anchor',
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: null
              },
            },
          })
        },
      }
    });

    graph.enablePanning();

    const graphStore = useGraphStore()
    graphStore.setGraph(graph)

    // 事件监听相关
    useGraphEvent()

    diagramId.value = route.params.diagramId as string
  })


</script>

<template>
  <navigator :diagramId="diagramId"></navigator>
  <div id="container" class="x6-graph-container"></div>
  <TeleportContainer />
</template>

<style scoped>
.x6-graph-container {
  border: 1px solid #ddd;
}
</style>