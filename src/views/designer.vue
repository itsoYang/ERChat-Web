<script setup lang="ts">
  import {onMounted} from "vue";
  import {Graph} from "@antv/x6";
  import ERNode from "../components/ERNode.vue";
  import { register, getTeleport } from '@antv/x6-vue-shape'
  import {registerPortLayout} from "../utils/RegisterPortLayout.ts";

  register({
    shape: 'er-node',
    component: ERNode,
  })

  registerPortLayout()

  const TeleportContainer = getTeleport()

  onMounted(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      grid: true,
    });
    graph.enablePanning();

    const node = graph.addNode({
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
      },
      ports: {
        groups: {
          left: {
            position: 'leftPortPosition',
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
          right: {
            position: 'rightPortPosition',
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
        },
      },
    });

    // 监听节点点击事件，显示连接桩
    graph.on('node:click', ({ e, x, y, node, view }) => {
      console.log('节点数据', node.getData());
      let { fields } = node.getData();
      fields.forEach((field, index) => {
        if (node.hasPort(`port-left-${index}`)) {
          return;
        }
        let {x, y} = node.getPosition();
        let {width, height} = node.size();
        node.addPort({
          group: 'left',
          id: `port-left-${index}`,
          args: {nodeX: x, nodeW: width}
        });
        node.addPort({
          group: 'right',
          id: `port-right-${index}`,
          args: {nodeX: x, nodeW: width}
        });
      });
    });
    // 监听画布点击事件，隐藏连接桩
    graph.on('blank:click', () => {
      graph.getNodes().forEach(node => {
        node.getPorts().forEach((port: any) => {
          node.removePort(port.id)
        });
      });
    });

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