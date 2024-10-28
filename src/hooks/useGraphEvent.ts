import {useGraphStore} from "../stores/graph.ts";
import {Graph, Edge, Node} from "@antv/x6";


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

/**
 * 监听节点移动事件，更新连接线
 */
export const useNodeMovingEvent = () => {
    const graphStore = useGraphStore()
    const graph: Graph = graphStore.graph as Graph

    // 计算连接桩ID
    const calcPointId = (pointId: string): string => {
        return pointId.includes('left')
            ? pointId.replace('left', 'right')
            : pointId.replace('right', 'left');
    };

    const updateEdgePorts = (edge: Edge, node: Node, targetNode: Node, isRightMove: boolean) => {
        let sourcePortId = edge.getSourcePortId()!;
        let targetPortId = edge.getTargetPortId()!;

        if (isRightMove) {
            if (!sourcePortId.includes('left')) {
                sourcePortId = calcPointId(sourcePortId);
            }
            if (!targetPortId.includes('right')) {
                targetPortId = calcPointId(targetPortId);
            }
        } else {
            if (!sourcePortId.includes('right')) {
                sourcePortId = calcPointId(sourcePortId);
            }
            if (!targetPortId.includes('left')) {
                targetPortId = calcPointId(targetPortId);
            }
        }

        edge.setSource({ cell: node.id, port: sourcePortId });
        edge.setTarget({ cell: targetNode.id, port: targetPortId });
    };

    graph.on('node:moving', ({ x, node }) => {
        const edges = graph.getEdges();
        edges.forEach(edge => {
            const sourceNode = edge.getSourceNode()
            const targetNode = edge.getTargetNode()
            // if (sourceNode && targetNode){
            //     if (sourceNode.id === node.id){
            //         if (x > targetNode.getPosition().x + targetNode.getSize().width / 2){ // 节点右移，交换连接桩 此时移动的节点连接点由右侧变为左侧 目标节点连接点由左侧变为右侧
            //             let sourcePortId = edge.getSourcePortId()
            //             let targetPortId = edge.getTargetPortId()
            //             if (sourcePortId && targetPortId){
            //                 let _sourcePortId = sourcePortId
            //                 let _targetPortId = targetPortId
            //                 if (_sourcePortId.indexOf('left') === -1){
            //                     _sourcePortId = calcPointId(_sourcePortId)
            //                 }
            //                 if (_targetPortId.indexOf('right') === -1){
            //                     _targetPortId = calcPointId(_targetPortId)
            //                 }
            //                 edge.setSource({cell: node.id, port: _sourcePortId})
            //                 edge.setTarget({cell: targetNode.id, port: _targetPortId})
            //             }
            //         }else if (x < targetNode.getPosition().x + targetNode.getSize().width / 2){ // 节点左移，交换连接桩
            //
            //         }
            //     }
            // }
            if (sourceNode && targetNode) {
                const targetNodePosition = targetNode.getPosition();
                const targetNodeSize = targetNode.getSize();
                const targetNodeCenterX = targetNodePosition.x + targetNodeSize.width / 2;

                if (x > targetNodeCenterX) { // 节点右移，交换连接桩
                    updateEdgePorts(edge, node, targetNode, true);
                } else if (x < targetNodeCenterX) { // 节点左移，交换连接桩
                    updateEdgePorts(edge, node, targetNode, false);
                }
            }
        })
    })
}