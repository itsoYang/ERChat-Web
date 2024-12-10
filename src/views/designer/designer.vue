<script setup lang="ts">
  import {onMounted, Ref, ref} from "vue";
  import { Graph, Shape } from "@antv/x6";
  import { getTeleport } from '@antv/x6-vue-shape'
  import { useGraphRegister } from "../../hooks/useGraphRegister.ts";
  import { useGraphStore } from "../../stores/graph.ts";
  import { useGraphEvent } from "../../hooks/useGraphEvent.ts";
  import {useRoute} from "vue-router";
  import Navigator from "./navigator.vue";
  import {queryDiagramById} from "../../api/designer/designer.ts";
  import { ElLoading } from 'element-plus'

  const route = useRoute();
  const diagramId: Ref<string | null> = ref(null)

  const loadDiagram = async (diagramId: string | null, graph: Graph) => {
    if (diagramId === null){
      throw new Error("diagramId is null")
    }
    const { success, data } = await queryDiagramById(diagramId)
    if (success && data){
      graph.fromJSON(data.elements)
    }
    ElLoading.service().close()
  }

  // 注册相关
  useGraphRegister()

  const TeleportContainer = getTeleport()

  onMounted(() => {

    ElLoading.service({
      text: '加载中...'
    })

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

    // 全局存储 graph 对象
    const graphStore = useGraphStore()
    graphStore.setGraph(graph)

    // 事件监听相关
    useGraphEvent()

    diagramId.value = route.params.diagramId as string

    // 初始化画布数据
    loadDiagram(diagramId.value, graph)
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
  height: 100%;
}
</style>