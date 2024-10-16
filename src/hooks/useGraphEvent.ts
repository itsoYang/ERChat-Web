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
        console.log('节点数据', node.getData());
        let { fields } = node.getData();
        // @ts-ignore
        fields.forEach((field: any, index: number) => {
            if (node.hasPort(`port-left-${index}`)) {
                return;
            }
            let {x} = node.getPosition();
            let {width} = node.size();
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
            node.getPorts().forEach((port: any) => {
                node.removePort(port.id)
            });
        });
    });
}