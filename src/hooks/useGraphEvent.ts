import {useGraphStore} from "../stores/graph.ts";
import {Graph, Edge, Node} from "@antv/x6";


/**
 * 监听节点点击事件
 */
const useNodeClickEvent = (graph: Graph) => {
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
const useBlankClickEvent = (graph: Graph) => {
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
 * 监听节点移动事件，更新边的连接点
 * 连接点ID规则 port-left-{字段索引} | port-right-{字段索引}
 * 更新规则，节点右移或者左移时，连线的连接点需更新到节点同一个字段的另一侧
 */
const useNodeMovingEvent = (graph: Graph) => {

    // 计算连接桩ID
    const calcPointId = (pointId: string): string => {
        return pointId.includes('left')
            ? pointId.replace('left', 'right')
            : pointId.replace('right', 'left');
    };

    const updateEdgePorts = (edge: Edge, node: Node, targetNode: Node, isRightMove: boolean, nodeType: string) => {
        let sourcePortId = edge.getSourcePortId()
        let targetPortId = edge.getTargetPortId()

        if (sourcePortId && targetPortId) {
            if (nodeType === 'source'){
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
            }else if (nodeType === 'target'){
                if (isRightMove) {
                    if (!targetPortId.includes('left')) {
                        targetPortId = calcPointId(targetPortId);
                    }
                    if (!sourcePortId.includes('right')) {
                        sourcePortId = calcPointId(sourcePortId);
                    }
                } else {
                    if (!targetPortId.includes('right')) {
                        targetPortId = calcPointId(targetPortId);
                    }
                    if (!sourcePortId.includes('left')) {
                        sourcePortId = calcPointId(sourcePortId);
                    }
                }
            }

            edge.setSource({ cell: node.id, port: sourcePortId });
            edge.setTarget({ cell: targetNode.id, port: targetPortId });
        }
    }

    graph.on('node:moving', ({ x, node }) => {
        const edges = graph.getEdges();
        edges.forEach(edge => {
            const sourceNode = edge.getSourceNode()
            const targetNode = edge.getTargetNode()
            if (sourceNode && targetNode) {
                const isSourceNode = node.id === sourceNode.id;
                const referenceNode = isSourceNode ? targetNode : sourceNode;
                const referenceNodePosition = referenceNode.getPosition();
                const referenceNodeSize = referenceNode.getSize();
                const referenceNodeCenterX = referenceNodePosition.x + referenceNodeSize.width / 2;
                const isRightMove = x > referenceNodeCenterX;
                const nodeType = isSourceNode ? 'source' : 'target';

                if (isSourceNode){
                    updateEdgePorts(edge, node, referenceNode, isRightMove, nodeType);
                }else {
                    updateEdgePorts(edge, referenceNode, node, isRightMove, nodeType);
                }
            }
        })
    })
}

/**
 * 监听连线连接事件
 */
const useEdgeConnectedEvent = (graph: Graph) => {
    graph.on('edge:connected', ({ isNew, edge }) => {
        if (isNew){
            // 边标签弹窗
            // edge.addTools( {
            //     name: 'edge-tool-button',
            //     args: {
            //         distance: '50%',
            //         offset: -10
            //     },
            // })
            edge.addTools( {
                name: 'edge-tool-button',
                args: {
                    distance: 0.5,
                },
            })
        }
    })
}

/**
 * 事件监听相关
 */
export const useGraphEvent = () => {
    const graphStore = useGraphStore()
    const graph: Graph = graphStore.graph as Graph
    // 节点点击事件
    useNodeClickEvent(graph)
    // 画布空白处点击事件
    useBlankClickEvent(graph)
    // 节点移动事件
    useNodeMovingEvent(graph)
    // 连线连接事件
    useEdgeConnectedEvent(graph)
}