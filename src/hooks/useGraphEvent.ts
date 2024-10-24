import {useGraphStore} from "../stores/graph.ts";
import {Graph} from "@antv/x6";


/**
 * 监听节点点击事件
 */
export const useNodeClickEvent = () => {
    const graphStore = useGraphStore()
    const graph: Graph = graphStore.graph as Graph
    // 监听节点点击事件，显示连接桩
    graph.on('node:click', ({ node }) => {
        const visibility = 1
        node.getPorts().forEach(port => {
            // @ts-ignore
            node.portProp(port.id, 'attrs/circle/visibility', visibility);
        });
    });
}

/**
 * 监听画布空白处点击事件
 */
export const useBlankClickEvent = () => {
    const graphStore = useGraphStore()
    const graph: Graph = graphStore.graph as Graph
    // 监听画布点击事件，隐藏连接桩
    graph.on('blank:click', () => {
        graph.getNodes().forEach(node => {
            const visibility = 0
            node.getPorts().forEach(port => {
                // @ts-ignore
                node.portProp(port.id, 'attrs/circle/visibility', visibility);
            });
        });
    });
}